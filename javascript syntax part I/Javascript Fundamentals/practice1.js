//Create a function colorMessage() that takes 2 string arguments, favoriteColor and shirtColor.
//If the value of favoriteColor is the same as the value of shirtColor return the string 'The shirt is your favorite color!'.

function colorMessage(favoriteColor, shirtColor) {
    if (favoriteColor === shirtColor) {
        return 'The shirt is your favorite color!'; //If the value of favoriteColor is the same as the value of shirtColor return the string 
        //'The shirt is your favorite color!'.
    } else {
        return 'That is a nice color.'; //If not, return the string 'That is a nice color.'
    } 
}

//Create a function isEven() that takes a number as its only parameter. 
//The function should return true if the number is even and false if the number is odd.
function isEven(number) {
    if (number % 2 === 0) {
        return true;
    } else {
        return false;
    }
}


/*I understand the confusion. In the statement "takes a number as its only parameter," 
it means that the function `isEven()` should be able to accept any number as an argument when you call it. 

For example, you can define the function like this:

```javascript
function isEven(number) {
    // Function logic to determine if the number is even or odd
}
```

When you call the function and provide a specific number as an argument, that number gets assigned to the `number` parameter within the function. 
You can then use that parameter to perform operations or logic to determine if the number is even or odd.

Here's an example:

```javascript
function isEven(number) {
    return number % 2 === 0;
}

console.log(isEven(3)); // Output: false
console.log(isEven(6)); // Output: true
```

In this case, the `isEven()` function takes a number as its parameter, and when you call it with `isEven(3)`, it will return `false` 
because 3 is not an even number. Similarly, `isEven(6)` will return `true` because 6 is an even number.*/
//If the variable x is between 0 and 9, return the string 'One digit: N', where N is the value of x. For example, numberDigits(5) would return: 'One digit: 5'
////If the variable x is between 10 and 99, return the string 'Two digits: N', where N is the value of x. For example, numberDigits(12) would output: 'Two digits: 12'
//Any other value of x, including negative numbers, return the string 'The number is: N', where N is the value of x. For example, numberDigits(-202) would output:'The number is: -202'
function numberDigits(x) {
    if (x >= 0 && x <= 9) {
        return `One digit: ${x}`;
    } else if (x >= 10 && x <= 99) {
        return `Two digits: ${x}`;
    } else {
        return `The number is: ${x}`;
    }
}

console.log(numberDigits(5));     // Output: One digit: 5
console.log(numberDigits(12));    // Output: Two digits: 12
console.log(numberDigits(-202));  // Output: The number is: -202
console.log(numberDigits(1000));  // Output: The number is: 1000
console.log(numberDigits(-5));    // Output: The number is: -5



/*The function numberDigits takes a single parameter x, which represents the number to be evaluated.

The first condition checks if x is between 0 and 9 (inclusive). It uses the logical AND operator (&&) 
to combine two conditions: x >= 0 and x <= 9. If both conditions are true, it means that x is a single-digit number. 
In this case, the function returns a string using string interpolation, which includes the value of x within the template string. 
For example, if x is 5, the function will return 'One digit: 5'.

If the first condition is not met, the code moves to the next condition. This condition checks if x is between 10 and 99 (inclusive). 
It uses the same logical AND operator to combine the conditions x >= 10 and x <= 99. If both conditions are true, 
it means that x is a two-digit number. The function returns a string similar to the previous case but with the prefix 'Two digits:'. 
For example, if x is 12, the function will return 'Two digits: 12'.

If neither of the previous conditions is met, it means that x is outside the ranges of 0 to 9 and 10 to 99. In this case, 
the code reaches the else block, which acts as a default case. The else block executes when none of the preceding conditions is true. 
It returns a string using string interpolation, which includes the value of x within the template string and the prefix 'The number is:'. 
This covers any other value of x, including negative numbers. For example, if x is -202, the function will return 'The number is: -202'.

Overall, the function checks the value of x against specific conditions to determine its range and provides an appropriate message 
based on that range. It ensures that the correct message is returned for single-digit numbers, two-digit numbers, and any other value of x 
that falls outside those ranges.*/








    