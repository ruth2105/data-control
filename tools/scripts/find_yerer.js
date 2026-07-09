// Run this in the browser console to find all hospitals with "yerer" in the name
(function() {
    const mc = JSON.parse(localStorage.getItem('fremenatos_machine') || '[]');
    const ec = JSON.parse(localStorage.getItem('fremenatos_external') || '[]');
    const allC = [...mc, ...ec];
    
    console.log('Total hospitals:', allC.length);
    console.log('\nSearching for hospitals containing "yerer" (case-insensitive):');
    
    const matches = allC.filter(c => c.name.toLowerCase().includes('yerer'));
    
    if (matches.length > 0) {
        matches.forEach(c => console.log('  -', c.name));
    } else {
        console.log('  None found');
    }
    
    console.log('\nAll hospital names:');
    allC.forEach((c, i) => console.log(`${i+1}. ${c.name}`));
})();
