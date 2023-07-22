
// Write your function here:
function agreeOrDisagree(first, second) {
    if (first === second) {
      return 'You agree!';
    } else {
      return 'You disagree!';
    }
  }
  
  console.log(agreeOrDisagree('Yes', 'No'));
  console.log(agreeOrDisagree('Open', 'Close'));
  console.log(agreeOrDisagree('Apple', 'Apple'));

  /*In the first example, the function is called with the strings 'Yes' and 'No', and it will output 'You disagree!' 
  because the strings are different.

  In the second example, the function is called with the strings 'Open' and 'Close', and it will output 'You disagree!' for the same reason.

  In the third example, the function is called with the string 'Apple' twice, and it will output 'You agree!' because the strings are the same.

  You can replace the strings 'Hello', 'Hello' with any other strings you want to compare using the agreeOrDisagree() function. 
  The purpose is to showcase how the function behaves when comparing different strings.*/
  
  
  
  
  
  