//Create a variable named input that is equal to any phrase you’d like.
let input = "turpentine and turtles";
//Create a variable named vowels that is equal to a string of all the vowels (a, e, i, o, u).
const vowels = ['a', 'e', 'i', 'o', 'u'];
//Create a variable named resultArray and set it equal to an empty array: [].
let resultArray = [];
//Create a loop to iterate through each letter of the input variable text.
for (let i = 0; i < input.length; i++) {
//Log the iterator numbered position inside the for loop to check the number of characters in the input string.
  //console.log(i);
//Create a nested for loop inside the outer loop to iterate through the vowels array each time the outer loop runs.
  for (let j = 0; j < vowels.length; j++) {
    //console.log(j);
//Inside the second for loop, write a code block that compares the input letter to every letter in the vowels array. 
//Add the vowels to the resultArray.
    if (input[i] === vowels[j]) {
//Add an if statement that checks if each letter in the input string is equal to 'e'. If so, use the .push() method to add input[i] to 
//the resultArray. Place this statement before the inner for loop block inside the outer for loop.
      if (input[i] === 'e') {
        resultArray.push(input[i]);
      }
//Add another if statement to double the letter 'u'.
      if (input[i] === 'u') {
        resultArray.push(input[i]);
      }
      resultArray.push(input[i]);
    }
  }
}

console.log(resultArray.join('').toUpperCase());

//console.log(resultArray);

