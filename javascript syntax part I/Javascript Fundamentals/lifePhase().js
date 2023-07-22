
// Write your function here:
function lifePhase(age) {
    switch (true) {
      case age >= 0 && age <= 3:
        return 'baby';
      case age >= 4 && age <= 12:
        return 'child';
      case age >= 13 && age <= 19:
        return 'teen';
      case age >= 20 && age <= 64:
        return 'adult';
      case age >= 65 && age <= 140:
        return 'senior citizen';
      default:
        return 'This is not a valid age';
    }
  }
  console.log(lifePhase(2)); // Output: baby
  console.log(lifePhase(10)); // Output: child
  console.log(lifePhase(16)); // Output: teen
  console.log(lifePhase(30)); // Output: adult
  console.log(lifePhase(75)); // Output: senior citizen
  console.log(lifePhase(-5)); // Output: This is not a valid age
  console.log(lifePhase(150)); // Output: This is not a valid age
  