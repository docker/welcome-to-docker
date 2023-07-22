//Let’s make a nested array! Create a variable numberClusters. Assign as its value an array with three array elements.
//The first array element should hold the elements 1 and 2 in that order.
//The second array element should hold the elements 3 and 4 in that order.
//The third array element should hold the elements 5 and 6 in that order.
const numberClusters = [[1, 2], [3, 4], [5, 6]];
//Awesome, you made a nested array! Now declare a variable named target using the const keyword and assign to access the element 6 inside numberClusters.
const target = numberClusters[2][1];

/* Review Arrays
Nice work! In this lesson, we learned these concepts regarding arrays:

Arrays are lists that store data in JavaScript.
Arrays are created with brackets [].
Each item inside of an array is at a numbered position, or index, starting at 0.
We can access one item in an array using its index, with syntax like: myArray[0].
We can also change an item in an array using its index, with syntax like myArray[0] = 'new string';
Arrays have a length property, which allows you to see how many items are in an array.
Arrays have their own methods, including .push() and .pop(), which add and remove items from an array, respectively.
Arrays have many methods that perform different tasks, such as .slice() and .shift(), you can find documentation at 
the Mozilla Developer Network website.
Some built-in methods are mutating, meaning the method will change the array, while others are not mutating. 
You can always check the documentation.
Variables that contain arrays can be declared with let or const. Even when declared with const, arrays are still mutable. 
However, a variable declared with const cannot be reassigned.
Arrays mutated inside of a function will keep that change even outside the function.
Arrays can be nested inside other arrays.
To access elements in nested arrays chain indices using bracket notation.
Learning how to work with and manipulate arrays will help you work with chunks of data!

Instructions
Looking for more ways to practice? Consider trying these:

Use the .length property to find the last element of an array.
Use the other methods in MDN documentation not mentioned in the lesson.
Take all the elements in an array and make a string.
Find the return value of calling .push() on an array.
Nest an array within an array.
Access an element in the nested array.*/

