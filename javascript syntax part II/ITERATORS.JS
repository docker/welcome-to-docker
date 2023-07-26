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
