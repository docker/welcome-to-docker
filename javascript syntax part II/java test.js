

/*/home/ccuser/workspace/learn-javascript-debugging-code/script.js:5
if (numberSum > total;) {
                     ^
            
SyntaxError: Unexpected token ;

------------------------------------------------------------------

From what file was this error thrown?
1 - Answer: script.js

On what line of that file was this error thrown?
2 - Answer: 5

What type of error was thrown in this stack trace?
3 - Answer: SyntaxError

What is the description of the error in this stack trace?
4 - Answer: Unexpected token

yVariable++;
// 1 - What type of error will be thrown on the line above: ReferenceError  

const myString = 42;
myString.substring(0);
// 2 - What type of error will be thrown on the line above: TypeError

const myRandomNumber; = Math.random();
// 3 - What type of error will be thrown on the line above: SyntaxError 



function isSumBigger(number1, number2, total {
    const sum = number1 + number2;
    
    if (numberSum > total;) {
      return true;
    } else {
      return false;
    }
  }
  
  // Should return true
  console.log('isSumBigger(1, 3, 2) returns: ' + isSumBigger(1, 3, 2));
  
  // Should return false
  console.log('isSumBigger(1, 3, 5) returns: ' + isSumBigger(1, 3, 5));

//answer:
let isSumBigger = (number1, number2, total) => {
    const sum = number1 + number2;
    
    if (sum > total) {
      return true;
    } else {
        return false;
    }
}
    
function capitalizeASingleWord(word) {
    //console.log(word);
    if (!word.match(' ')) {
        console.log('Word value inside of if statement: ' + word);
        //Looking at our if statement, we accidentally included a ! that is negating our condition. 
        //It is saying that if a word does not have multiple words, go into the if block, and if it does, move past it.
      return null;
    }
    
    let firstLetter = word.charAt(0);
    const restOfWord = word.slice(1);
    
    firstLetter = firstLetter.toUpperCase();
    
    return firstLetter + restOfWord;
  }
  
  // Should return "Hey"
  console.log("capitalizeASingleWord('hey') returns: " + capitalizeASingleWord('hey')); 
  
  // Should return null
  console.log("capitalizeASingleWord('hey ho') returns: " + capitalizeASingleWord('hey ho'));


  */

