// Write your function here:
function calculateWeight(earthWeight, planet) {
    switch (planet) {
        case 'Mercury':
            return earthWeight * 0.378;
        case 'Venus':
            return earthWeight * 0.907;
        case 'Mars':
            return earthWeight * 0.377;
        case 'Jupiter':
            return earthWeight * 2.36;
        case 'Saturn':
            return earthWeight * 0.916;
        default:
            return 'Invalid Planet Entry. Try: Mercury, Venus, Mars, Jupiter, or Saturn.';
    }
    return earthWeight * planet;
}
console.log(calculateWeight(100, 'Jupiter')); // Should print 236
// Uncomment the line below when you're ready to try out your function
// console.log(calculateWeight(100, 'Jupiter')) // Should print 236
// We encourage you to add more function calls of your own to test your code!