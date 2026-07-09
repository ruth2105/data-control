import re

def add_fields_to_customers(file_path):
    # Read the file
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Pattern to match customer objects ending with doctors:"" or doctors:"something"},
    # We'll add specialty and ownership fields before the closing brace
    pattern = r'(doctors(?:Zh)?:"[^"]*")([,\}])'
    
    def replace_func(match):
        doctors_field = match.group(1)
        closing = match.group(2)
        # Add specialty and ownership fields
        if closing == ',':
            return f'{doctors_field},specialty:"",specialtyZh:"",ownership:"",ownershipZh:"",'
        else:
            return f'{doctors_field},specialty:"",specialtyZh:"",ownership:"",ownershipZh:""'
    
    # Apply replacement
    new_content = re.sub(pattern, replace_func, content)
    
    # Write back
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    print(f"Updated {file_path}")

# Update all three files
files = [
    'c:\\Users\\user\\Desktop\\hospital list\\admin.html',
    'c:\\Users\\user\\Desktop\\hospital list\\sales.html',
    'c:\\Users\\user\\Desktop\\hospital list\\index.html'
]

for file_path in files:
    add_fields_to_customers(file_path)

print("All files updated successfully!")
