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
Write a function declineEverything() that takes in an array of strings and, using .forEach(), 
loops through each element in the array and calls politelyDecline() with each of them.

The .forEach() function should apply politelyDecline() directly; it should NOT merely receive an argument function that uses politelyDecline().

You can test your function when you’re ready by passing in the veggies array or by making your own array!
Now we need to get healthy! Write a function acceptEverything() that takes in an array of strings and loops through 
each element in the array and grudgingly accepts each of them, by logging to the console in 
the following format: 'Ok, I guess I will eat some [element].'

You can use any technique you want to accomplish this task. You can test your function 
when you’re ready by passing in the veggies array or by making your own array!

const veggies = ['broccoli', 'spinach', 'cauliflower', 'broccoflower'];

const politelyDecline = (veg) => {
      console.log('No ' + veg + ' please. I will have pizza with extra cheese.');
}

function declineEverything(arr) {
    arr.forEach(politelyDecline);
}

function acceptEverything(arr) {
    arr.forEach(element => {
        console.log(`Ok, I guess I will eat some ${element}.`);
    });
}
console.log(declineEverything(['cookies', 'candy', 'spinach']));

Write a function, squareNums(), that takes in an array of numbers and, using .map(), 
returns an array with the square of each of the elements of that array.

You can test your function when you’re ready by passing in the numbers array or by making your own array!


const numbers = [2, 7, 9, 171, 52, 33, 14]

const toSquare = num => num * num

// Write your code here:
function squareNums(arr) {
    return arr.map(num => num * num);
}
console.log(squareNums([1, 2, 3, 4]));

Write a function shoutGreetings() that takes in an array of strings and returns a new array. 
This new array should contain all the strings from the argument array but with capitalized letters and an exclamation 
point appended to the end: 'heya' will become 'HEYA!'

You can use any technique you want to accomplish this task.

You can test your function when you’re ready by passing in the greetings array or by making your own array!

function shoutGreetings(arr) {
    return arr.map(function(str) {
        return str.toUpperCase() + '!';
    });
}

const greetings = ['hello', 'hi', 'heya', 'oi', 'hey', 'yo'];

console.log(shoutGreetings(greetings))

Write a function sortYears() that takes in an array of years, and, using the built-in .sort() method, 
returns that array with the years sorted in descending order.

You can test your function when you’re ready by passing in the years array or by making your own array of years!


function sortYears(arr) {
  return arr.sort((a, b) => b - a);
}

const years = [1970, 1999, 1951, 1982, 1963, 2011, 2018, 1922]

console.log(sortYears(years))
// Should print [ 2018, 2011, 1999, 1982, 1970, 1963, 1951, 1922 ]


Write a function justCoolStuff() that takes in two arrays of strings, and, using the built-in .filter() method, 
returns an array with the items that are present in both arrays.

let arr1 = ['this', 'not this', 'nor this'];
let arr2 = ['thing 1', 'thing 2', 'this'];

justCoolStuff(arr1, arr2); // Should return ['this']

You can test your function when you’re ready by passing in the myStuff and coolStuff arrays or by making arrays of your own!

function justCoolStuff(arr1, arr2) {
  return arr1.filter(function(item){
    return arr2.includes(item);
  });
}
const arr1 = ['this', 'not this', 'nor this'];
const arr2 = ['thing 1', 'thing 2', 'this'];

const result = justCoolStuff(arr1, arr2);
console.log(result); // Outputs: ['this']

Write a function isTheDinnerVegan() that takes in an array of food objects in the format:

{name: 'cabbage', source: 'plant' }

and returns a boolean value based on whether or not every item in the array has entirely plant-based origins.

const meal = [{name: 'arugula', source: 'plant'}, {name: 'tomatoes', source: 'plant'}, {name: 'lemon', source:'plant'}, {name: 'olive oil', source: 'plant'}];

isTheDinnerVegan(meal); // Should return true

You can test your function when you’re ready by passing in the dinner array or by making your own!

function isTheDinnerVegan(arr) {
  return arr.every(function(food) {
    return food.source === 'plant';
  });
}
const meal = [{
  name: 'arugula', source: 'plant'}, 
  {name: 'tomatoes', source: 'plant'},
  {name: 'lemon', source:'plant'},
  {name: 'olive oil', source: 'plant'}];

console.log(isTheDinnerVegan(meal));

Write a function sortSpeciesByTeeth() that takes in an array of species objects in the format:

{speciesName: 'shark', numTeeth: 50 }

and sorts the array in ascending order based on the average number of teeth that species possesses (numTeeth) .

You’ll need to access each object’s .numTeeth property. Feel free to either write a named comparison function, 
or use an anonymous function for your argument to .sort().

You can test your function when you’re ready by passing in the speciesArray array or by making your own!


const speciesArray = [ {speciesName:'shark', numTeeth:50},
  {speciesName:'dog', numTeeth:42}, 
  {speciesName:'alligator', numTeeth:80},
  {speciesName:'human', numTeeth:32}];

// Write your code here:

function sortSpeciesByTeeth(arr) {
  return arr.sort(function(a, b) {
    return a.numTeeth - b.numTeeth;
  });
}

console.log(sortSpeciesByTeeth(speciesArray));


Write a function, findMyKeys(), that takes in an array of strings which may or may not contain 'keys'. 
If the keys are in the array, your function should return the index at which they can be found. If they’re not in the array, 
your function should return -1.

const drawer = ['rubber bands', 'tape', 'old menus', 'batteries'];
findMyKeys(drawer);
// Should return -1

You can use any technique you want to accomplish this task. Though, if you look, there’s a built-in method that will make pretty quick work of it.

You can test your function when you’re ready by passing in the randomStuff array or by making your own array!

function findMyKeys(arr) {
  return arr.indexOf('keys');
}

const drawer = ['rubber bands', 'tape', 'old menus', 'batteries'];
console.log(findMyKeys(drawer)); // Output -1


Write a function, dogFactory(). It should:

have 3 parameters: name, breed, and weight (in that order)
expect name and breed to be strings
expect weight to be a number
return an object
have each of those parameters as keys on the returned object returned with the values of the arguments that were passed in
dogFactory('Joe', 'Pug', 27)
// Should return { name: 'Joe', breed: 'Pug', weight: 27 }

Add getters and setters for each of the three properties and change the property names to have an underscore prepended.

Add two methods to your object: .bark() which returns ‘ruff! ruff!’ and .eatTooManyTreats() which should increment the weight property by 1.
*/
function dogFactory(name, breed, weight) {
  return {
    _name: name,
    _breed: breed,
    _weight: weight,
    get name() {
      return this._name;
    },
    set name(value) {
      this._name = value;
    },
    get breed() {
      return this._breed;
    },
    set breed(value) {
      this._breed = value;
    },
    get weight() {
      return this._weight;
    },
    set weight(value) {
      this._weight = value;
    },
    bark() {
      return 'ruff! ruff!';
    },
    eatTooManyTreats() {
      this._weight++;
    }
  };
}




const dog = dogFactory('Joe', 'Pug', 27);
console.log(dog);