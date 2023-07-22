
////////////////////////////////////////////////////// QUIZ ARRAYS //////////////////////////////////////////////////////

const myArray = ['item 0', 'item 1', 'item 2'];
 
myArray.push('item 3');
myArray.pop();
 
console.log(myArray); // [ 'item 0', 'item 1', 'item 2' ]
//Correct! .push('item 3') adds 'item 3' to the end of myArray and .pop() removes the last element.

myArray.length;
//You got it! You can access the .length property of an array to get the number of elements in the array.

const cities = ['Chicago', 'San Francisco', 'New York'];
console.log(cities[3]); // undefined
//Perfect! There’s no element currently in index 3, so cities[3] returns undefined.


//What is the correct syntax for an array?
//let myArray = ["", "", ""];
//Nice work! Array literals are denoted by [] and the elements are separated by commas.

//What is the purpose of an array?
//to store data in an organized structure

const countries = ['Japan', 'Denmark', 'Mexico', 'Morocco'];
countries.shift();
console.log(countries);
// [ 'Denmark', 'Mexico', 'Morocco' ]

countries =  ['England', 'Mozambique', 'Cambodia', 'Peru']; 
console.log(countries);

//What is the value of topPriority?
const errands = ['Go to the bank', 'Pick up dry cleaning', 'Go grocery shopping'];
const topPriority = errands.indexOf('Pick up dry cleaning');
console.log(topPriority); // 1
//Correct! .indexOf() returns the index of the element in the array, given that the element in the array

const fruits = ['Apples', 'Oranges', 'Pears', 'Mangos']; 
fruits[2] = 'Bananas';
console.log(fruits); 
// [ 'Apples', 'Oranges', 'Bananas', 'Mangos' ]

//Which of the methods below does NOT change the array it is called on?
//slice()
//Correct, the slice() method does not change the array it is called on. Instead, it returns a new array that contains 
//a shallow copy of a portion of the original array based on the specified start and end indices. The original array remains unchanged.

//How could you access the second item, ‘Lion’, in the following code block?
const animalArray = ['Sloth', 'Lion', 'Chipmunk'];
animalArray[1]; //Way to go! Lion is in index 1 of animalArray







