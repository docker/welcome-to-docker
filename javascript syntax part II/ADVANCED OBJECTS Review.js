/*Review
Congratulations on finishing Advanced Objects!

Let’s review the concepts covered in this lesson:

The object that a method belongs to is called the calling object.
The this keyword refers to the calling object and can be used to access properties of the calling object.
Methods do not automatically have access to other internal properties of the calling object.
The value of this depends on where the this is being accessed from.
We cannot use arrow functions as methods if we want to access other internal properties.
JavaScript objects do not have built-in privacy, rather there are conventions to follow to notify other developers about the intent of the code.
The usage of an underscore before a property name means that the original developer did not intend for that property to be directly changed.
Setters and getter methods allow for more detailed ways of accessing and assigning properties.
Factory functions allow us to create object instances quickly and repeatedly.
There are different ways to use object destructuring: one way is the property value shorthand and another is destructured assignment.
As with any concept, it is a good skill to learn how to use the documentation with objects!
You’re ready to start leveraging more elegant code for creating and accessing objects in your code!*/

//Quiz
/*Which of the following is an example of destructured assignment?
const myDog = {
  name: 'Tadpole',
  breed: 'mutt',
  color: 'tan',
  weight: 32
}
//answer
let {name} = myDog; 
Correct! Using ES6’s destructured assignment, we can use this syntax to create a variable name with a value of myDog‘s .name property

What should we add to the empty .withDiscount() method to return the cost of the meatballs object with a two dollar discount?
//Answer 
const meatballs = {
  cost: 2.99,
  withDiscount: function() {
    return this.cost - 2;
  }
}

What will the following code output?
//Answer 
const car = {
  numDoors: 4,
  isDirty: true,
  color: 'red'
} 
for (let key in car) {
  console.log(key)
}
result: numDoors, isDirty, color

What is a method?
//Answer
A method is a property which functions as its value. 

What’s wrong with the setter method in the example below?
let tempObj = {
  _num: 22,
  set num(numIn) { 
    _num = numIn;
  }
};
Answer 
the setter should be contain this.num in place of _num. 

How can we add a property to the object below?
let bikes = {
  schwinn: 'blue',
  trek: 'black'
}
Asnwer 
bike['specialized'] = 'red';

Which of the following statements is correct?
answer
Objects store unordered data of any type as key-value pairs.

Which line of code would NOT print the value saved to the _num key in the tempObj object.
answer 
console.log(tempObj.num());
Correct! We wrote a getter. This line is looking for a regular method called .num() and would cause an error

Which of the following Object methods can be used to copy all of the properties of an object into a new object?
answer 
object.assign 

Given the following code, which expression will evaluate to apples?
const refrigerator = {
  dairy: ['cheese', 'milk', 'sour cream'],
  temperature: 35,
  'produce drawer': {
    vegetables: ['lettuce', 'broccoli', 'peas'],
    fruit: ['apples', 'berries', 'grapes'] 
  }
}
answer 
refrigerator['produce drawer'].fruit[0]
refrigerator['produce drawer'] will evaluate to the object containing the fruit key which holds an array. 
At the 0th index of that array is 'apples'


What are the keys in this object?
let apartment = {
  coffeeMaker: 'Aeropress',
  ceilingFan: true,
  books: 114
}
Answer
coffieMaker
CeilingFan
books

Which is the correct syntax for creating an object literal?
let myJobject = {
  greeting: 'hello'
};

How can we call the method in the code below?
let myObj = {
  sayHello() {
    return 'Hello there!';
  }
}
Answer
myObj.sayHello();

What is a factory function?
Answer
A factory function is a function that returns an object.
*/






