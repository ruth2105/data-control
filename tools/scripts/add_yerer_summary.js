// Run this in the browser console on index.html or admin.html
// This will add the Yerer General Hospital summary to the matching customer

const yererSummary = `Yerer General Hospital is a hot priority facility located in yerer. They currently use Finecare, Zybio, Maglumi for hormone testing, Mindray for chemistry, and fully automated un specified anlyzer  for electrolyte analysis. The facility has an estimated patient load of >20 tests/day and requires SST, EDTA tubes.
Current opportunity: Considering ACCRE as an additional analyzer. Continued follow-up with Head Lab Technician is recommended to advance the opportunity.`;

(function() {
    const mc = JSON.parse(localStorage.getItem('fremenatos_machine') || '[]');
    const ec = JSON.parse(localStorage.getItem('fremenatos_external') || '[]');
    const allC = [...mc, ...ec];
    
    // Find Yerer General Hospital (case-insensitive)
    const yererCustomer = allC.find(c => c.name.toLowerCase().includes('yerer'));
    
    if (yererCustomer) {
        console.log('Found customer:', yererCustomer.name);
        yererCustomer.summary = yererSummary;
        console.log('Added summary to:', yererCustomer.name);
        
        // Save back to localStorage
        if (mc.includes(yererCustomer)) {
            localStorage.setItem('fremenatos_machine', JSON.stringify(mc));
        } else {
            localStorage.setItem('fremenatos_external', JSON.stringify(ec));
        }
        
        console.log('✅ Summary saved! Refresh the page to see it.');
    } else {
        console.log('❌ Yerer General Hospital not found in database');
        console.log('Available hospitals:', allC.map(c => c.name).slice(0, 20));
    }
})();
