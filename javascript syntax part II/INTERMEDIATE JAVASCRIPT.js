/*Write a function, reverseArray(), that takes in an array as an argument and returns a new array with the elements in the reverse order.

There’s a built-in method that does a lot of this work for you, but here you’re not allowed to use it. 
Don’t worry you’ll have plenty of opportunities to use built-in methods later on!

function reverseArray(arr) {
    let newArr = [];
    for (let i = arr.length - 1; i >= 0; i--) {
        newArr.push(arr[i]);
    }
    return newArr;
}
Write a function, greetAliens(), that takes in an array of strings and uses a for loop to print a greeting with each string in the array.

The greeting should take the following format:
“Oh powerful [stringElement], we humans offer our unconditional surrender!”
function greetAliens(arr) {
    for (let i = 0; i < arr.length; i++) {
        console.log(`Oh powerful ${arr[i]}, we humans offer our unconditional surrender!`);
    }
}

Write a function, convertToBaby(), that takes in an array as an argument and, using a loop, 
returns a new array with each string in the array prepended with 'baby '

function convertToBaby(arr) {
    let newArr = [];
    for (let i = 0; i < arr.length; i++) {
        newArr.push(`baby ${arr[i]}`);
    }
    return newArr;
}
const numbers = [5, 3, 9, 30];

const smallestPowerOfTwo = arr => {
  let results = [];
  for (let i = 0; i < arr.length; i++) {
    number = arr[i];
    i = 1;
    while (i < number) {
      i = i * 2;
    }
    results.push(i);
  }
  return results;
}

console.log(smallestPowerOfTwo(numbers));
           
                            Answer 

const numbers = [5, 3, 9, 30];

// Define a function called smallestPowerOfTwo that takes an array arr as input.
const smallestPowerOfTwo = arr => {
  // Initialize an empty array to store the results.
  let results = [];

  // The 'outer' for loop - loops through each element in the array.
  for (let i = 0; i < arr.length; i++) {
    // Get the current number from the array.
    number = arr[i];

    // Initialize a variable to calculate the smallest power of 2.
    let powerOfTwo = 1;
    console.log(powerOfTwo);
    // The 'inner' while loop - searches for the smallest power of 2 greater than or equal to the given number.
    while (powerOfTwo < number) {
      // Double the powerOfTwo in each iteration to find the next power of 2.
      powerOfTwo = powerOfTwo * 2;
    }

    // Push the smallest power of 2 into the results array.
    results.push(powerOfTwo);
  }

  // Return the results array.
  return results;
}

// Call the smallestPowerOfTwo function with the numbers array and print the result.
console.log(smallestPowerOfTwo(numbers));

// Should print the returned array [ 8, 4, 16, 32 ]
*/
