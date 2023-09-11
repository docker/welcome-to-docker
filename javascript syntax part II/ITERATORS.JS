/*
1) const fruits = ['mango', 'papaya', 'pineapple', 'apple'];

// Iterate over fruits below
Iterate over the fruits array to log I want to eat a plus the name of each fruit to the console. For example, I want to eat a mango.

You may use any form of callback you prefer.
fruits.forEach(function(fruit) {
    console.log(`I want to eat a ${fruit}`);

});

Add your code under the animals array and before the line console.log(secretMessage.join(''));

Use .map() to create a new array that contains the first character of each string in the animals array. 
Save the new array to a const variable named secretMessage.
Use .map() to divide all the numbers in bigNumbers by 100. Save the returned values to a variable declared with const called smallNumbers.

const animals = ['Hen', 'elephant', 'llama', 'leopard', 'ostrich', 'Whale', 'octopus', 'rabbit', 'lion', 'dog'];

// Create the secretMessage array below

const secretMessage = animals.map(animal => animal[0]);

console.log(secretMessage.join(''));

const bigNumbers = [100, 200, 300, 400, 500];

// Create the smallNumbers array below

const smallNumbers = bigNumbers.map(number => number / 100);

console.log(smallNumbers);

*/

/*Call the .filter() method on randomNumbers to return values that are less than 250. Save them to a new array called smallNumbers, declared with const.
Now let’s work with an array of strings. Invoke .filter() on the favoriteWords array to return elements that have more than 7 characters. Save the returned array to a const variable named longFavoriteWords.


const randomNumbers = [375, 200, 3.14, 7, 13, 852];

// Call .filter() on randomNumbers below
const smallNumbers = randomNumbers.filter(number => number < 250);
console.log (smallNumbers.length);


const favoriteWords = ['nostalgia', 'hyperbole', 'fervent', 'esoteric', 'serene'];


// Call .filter() on favoriteWords below

const longFavoriteWords = favoriteWords.filter(word => word.length > 7);

console.log(longFavoriteWords);
*/

/*Invoke .findIndex() on the animals array to find the index of the element that has the value 'elephant' 
and save the returned value to a const variable named foundAnimal.

Let’s see if we can find the index of the first animal that starts with the letter 's'.


const animals = ['hippo', 'tiger', 'lion', 'seal', 'cheetah', 'monkey', 'salamander', 'elephant'];

const foundAnimal = animals.findIndex(animal => animal === 'elephant');

Call .findIndex() on the animals array and return the index of the first element that starts with 's'. 
Assign the returned value to a const variable named startsWithS.

const startsWithS = animals.findIndex(animal => animal[0] === 's');
console.log(foundAnimal);
console.log(startsWithS);
*/
/*
Let’s practice calling .reduce() and using console.log() to check the values as .reduce() iterates through the array.

In main.js, there is an array of numbers, newNumbers.

To start, declare a new variable named newSum using the const keyword. Assign to newSum the value of calling .reduce() on newNumbers. You don’t need to provide any arguments to .reduce() yet.

You’ll also see a TypeError: undefined is not a function but we’ll fix that after we add our callback function in the next step!
Provide .reduce with an argument of a callback function. The callback function has two parameters. The first parameter is accumulator and the second parameter is currentValue. Use either a function expression or an arrow function.
*/

/*
In main.js, there is an array of numbers, newNumbers.

To start, declare a new variable named newSum using the const keyword. Assign to newSum the value of calling .reduce() on newNumbers. You don’t need to provide any arguments to .reduce() yet.

You’ll also see a TypeError: undefined is not a function but we’ll fix that after we add our callback function in the next step!
Provide .reduce with an argument of a callback function. The callback function has two parameters. The first parameter is accumulator and the second parameter is currentValue. Use either a function expression or an arrow function.
To check the value being used as we iterate through the array, add three statements to the function body of the callback:

console.log('The value of accumulator: ', accumulator);
console.log('The value of currentValue: ', currentValue);
a return statement that adds accumulator to currentValue.
Log the value of newSum to the console to see the return value of calling .reduce() on newNumbers.
While we have this code set up, let’s also check what happens if you add a second argument to .reduce(). The second argument acts as an initial value for the accumulator.

Add a second argument of 10 to .reduce().
*/
const newNumbers = [1, 3, 5, 7];


// Write your code below:
/*
const newSum = newNumbers.reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
    console.log('The value of accumulator: ', accumulator);
    console.log('The value of currentValue: ', currentValue);
    return accumulator + currentValue;
    console.log(newSum);
}, 10);
console.log(newSum);
*/
const words = ['unique', 'uncanny', 'pique', 'oxymoron', 'guise'];

// Something is missing in the method call below
/*
console.log(words.some(() => {
  return word.length < 6;
}));
*/

//correct
console.log(words.some((word) => {
    return word.length < 6;
}));

// Use filter to create a new array
const interestingWords = words.filter(word => word.length > 5);

// Make sure to uncomment the code below and fix the incorrect code before running it

// console.log(interestingWords.every((word) => { } ));

//correct

console.log(interestingWords.every((word) => {
    return word.length > 5;
}));




