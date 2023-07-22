
function finalGrade(midterm, final, assignment) {
    if ((midterm < 0 || midterm > 100) || (final < 0 || final > 100) || (assignment < 0 || assignment > 100)) {
      return 'You have entered an invalid grade.';
    }
  
    let average = (midterm + final + assignment) / 3;
  
    switch (true) {
      case average >= 90 && average <= 100:
        return 'A';
      case average >= 80 && average <= 89:
        return 'B';
      case average >= 70 && average <= 79:
        return 'C';
      case average >= 60 && average <= 69:
        return 'D';
      case average >= 0 && average <= 59:
        return 'F';
      default:
        return 'You have entered an invalid grade.';
    }
  }
  
  console.log(finalGrade(70, 85, 90)); // Output: 'B'
  console.log(finalGrade(50, 60, 70)); // Output: 'D'
  console.log(finalGrade(90, 95, 80)); // Output: 'A'
  console.log(finalGrade(80, 70, 60)); // Output: 'C'
  console.log(finalGrade(40, 30, 20)); // Output: 'F'
  console.log(finalGrade(75, 95, 110)); // Output: 'You have entered an invalid grade.'
  
  
  
  // Uncomment the line below when you're ready to try out your function
  // console.log(finalGrade(99, 92, 95)) // Should print 'A'
  
  // We encourage you to add more function calls of your own to test your code!