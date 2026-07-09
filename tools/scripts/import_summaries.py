import json
import re

# Read the summaries file
with open('Customer_Facility_Summaries.txt', 'r', encoding='utf-8') as f:
    content = f.read()

# Parse the summaries
lines = content.split('\n')
summaries = {}
current_hospital = None
current_summary = []

for line in lines:
    line = line.strip()
    if not line:
        continue
    
    # Check if this is a hospital name (no period at end, not starting with "Current opportunity")
    if line and not line.endswith('.') and not line.startswith('Current opportunity') and line != 'Customer Facility Summaries':
        # Save previous hospital if exists
        if current_hospital and current_summary:
            summaries[current_hospital] = '\n'.join(current_summary)
        
        # Start new hospital
        current_hospital = line
        current_summary = []
    elif current_hospital:
        # Add to current summary
        current_summary.append(line)

# Save last hospital
if current_hospital and current_summary:
    summaries[current_hospital] = '\n'.join(current_summary)

print(f"Parsed {len(summaries)} hospital summaries")

# Load existing customer data
with open('IMPORT_READY_HOSPITALS.json', 'r', encoding='utf-8') as f:
    customers = json.load(f)

# Match and add summaries
matched = 0
unmatched = []

for customer in customers:
    hospital_name = customer.get('name', '')
    # Try exact match first
    if hospital_name in summaries:
        customer['summary'] = summaries[hospital_name]
        matched += 1
        print(f"✓ Matched: {hospital_name}")
    else:
        # Try case-insensitive match
        found = False
        for summary_name in summaries:
            if summary_name.lower() == hospital_name.lower():
                customer['summary'] = summaries[summary_name]
                matched += 1
                print(f"✓ Matched (case-insensitive): {hospital_name}")
                found = True
                break
        if not found:
            unmatched.append(hospital_name)
            print(f"✗ No match: {hospital_name}")

print(f"\nMatched: {matched}/{len(customers)}")
print(f"Unmatched: {len(unmatched)}")
if unmatched:
    print("\nUnmatched hospitals:")
    for h in unmatched:
        print(f"  - {h}")

# Save updated data
with open('IMPORT_READY_HOSPITALS_WITH_SUMMARIES.json', 'w', encoding='utf-8') as f:
    json.dump(customers, f, ensure_ascii=False, indent=2)

print("\nSaved to IMPORT_READY_HOSPITALS_WITH_SUMMARIES.json")
