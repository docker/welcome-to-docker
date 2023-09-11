/*
Which of the following methods returns a boolean value?
.some(function)
Correct! Calling .some() on an array returns a boolean value based on the condition in the callback function.

What will the following code return?
const animals = ['bears', 'cats', 'dogs', 'elephants', 'giraffes'];
animals.some(animal => animal.length < 5);
it will return true because there is a match.

What is the value of foundElement after the code runs?
const randomNums = [1, 123, 25, 90, 3543, 42];
const foundElement = randomNums.findIndex(num => num > 200);
the value of foundElement after the code runs is 4. 

Which of the following methods returns a new array?
.filter(function)
Correct! Calling .filter() on an existing array returns a new array.

Which of the following methods returns an array with values that evaluate to truthy based on the condition in the method’s block?
.filter(function) 
Correct! Calling .filter() returns a new array based on the condition in the callback function.


What will the following code return?
const animals = ['bears', 'cats', 'dogs', 'elephants', 'giraffes'];
animals.every(animal => animal.length < 5);
the code return false. 

Which of the following iterator methods returns undefined?
.forEach(function)
Correct! Calling .forEach() on an existing array returns undefined.

What is the correct way to refactor .forEach()‘s callback function below to use arrow function syntax?

namesArray.forEach(function(name) {
  console.log('Welcome, ' + name + '!');
}

namesArray.forEach(name => console.log('Welcome, ' + name + '!'));
*/