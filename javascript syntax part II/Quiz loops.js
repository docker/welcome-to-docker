 /*
 What would the output of this block of code be?
const animal = 'cat';

for (let i = 0; i < animal.length; i++) {
  console.log(animal[i]);
  for (let j = 1; j < 4; j++) {
    console.log(j);
  }
}

output; is c123a123t123
*/

/*
What do nested for loops do?

Nested for loops allow us to run multiple for loops at once.
*/

/* 
What problem is caused by this code block?
for (let i = 10; i > 0; i++) {
  console.log(i);
};

the code will loop forever because i  will always be greater than 0.
 The code will create an infinite loop since it never reaches its stop condition.
*/

/* 
You want to run a code block at least once, then loop as long as a condition remains true. Which kind of loop would you use?

A do .... while statement.
*/

/* 
Which statement is true about for loops?
for loops are appropriate when looping  a predetermine number of times. 

Yes, that statement is true. 
For loops are commonly used when you know the number of iterations you want to perform in advance. 
The structure of a for loop allows you to specify the initialization, condition, and iteration in a concise manner.

Here's the general syntax of a for loop:

for (initialization; condition; iteration) {
  // Code to be executed in each iteration
}

The initialization step is executed once before the loop starts and is typically used to set up the loop control variable. 
The condition is evaluated before each iteration, and if it evaluates to true, the loop body is executed. After each iteration, 
the iteration step is executed, usually used to update the loop control variable.

For example, if you know that you want to perform a specific action 5 times, you can use a for loop:

for (let i = 0; i < 5; i++) {
  // Code to be executed in each iteration
  console.log('Iteration:', i);
}

In this case, the loop will execute 5 times, as specified by the condition `i < 5`. Once `i` becomes equal to 5, 
the condition becomes false, and the loop terminates.

Therefore, for loops are appropriate when you have a predetermined number of iterations that you want to perform.
*/

/*
What will be the result of the code block?
let socialMedia = ['Instagram', 'Facebook', 'Twitter'];
 
for (let socialMediaIndex = 0; socialMediaIndex < socialMedia.length; socialMediaIndex++) {
    console.log(socialMedia[socialMediaIndex]);
}

Output is  
'Instagram'
 'Facebook'
 'Twitter'
*/

/*
What is the general purpose of a loop?

loops automatically iterate a block of code based on condition. 
*/

/*
Which statement is true about while loops?

While loops evalutes the condition for however long it's true and the looping stops when the condition is false. 
*/

/*

What is incorrect about the code block?

  for (let i = 0, i < myArray.length,  i++) {
    console.log(myArray[i]);
  };

The condition of the loop should be separetad by semicolons, not commas. 
*/

/*
You want to run a code block at least once, then loop as long as a condition remains true. Which kind of loop would you use?
*/

