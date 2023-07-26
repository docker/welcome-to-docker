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
