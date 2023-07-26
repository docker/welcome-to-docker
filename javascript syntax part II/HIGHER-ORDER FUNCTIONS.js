/*
We’ve defined a function with a very long name: checkThatTwoPlusTwoEqualsFourAMillionTimes(). This function takes a long time to execute. It checks whether 2 + 2 = 4, but it does it a million times (just to be really sure)!

Using const, declare a shorter-named variable, isTwoPlusTwo that will be easier to work with. Assign checkThatTwoPlusTwoEqualsFourAMillionTimes as its value.
Invoke your isTwoPlusTwo() function.
Use isTwoPlusTwo to console.log() the name property of the function we assigned to isTwoPlusTwo.



const checkThatTwoPlusTwoEqualsFourAMillionTimes = () => {
    for(let i = 1; i <= 1000000; i++) {
      if ( (2 + 2) != 4) {
        console.log('Something has gone very wrong :( ');
      }
    }
  };
  
  // Write your code below
  const isTwoPlusTwo = checkThatTwoPlusTwoEqualsFourAMillionTimes;
  isTwoPlusTwo();
  console.log(isTwoPlusTwo.name);
  */

  /*
  Here we have a function, addTwo(), that adds 2 to whatever is passed into it. Below that, we’ve created what will be a higher-order function, checkConsistentOutput(). The purpose of the higher-order function will be to check the work of addTwo(). Let’s get started!

To begin, inside the body of checkConsistentOutput(), declare two variables: checkA and checkB:

checkA stores the sum val plus 2.
checkB stores the invocation of the func callback, with val as the argument.
Finally, using console.log(), log the invocation of checkConsistentOutput() with two arguments: the addTwo() function and any number.
  */
const addTwo = num => {
    return num + 2;
  }
  
  const checkConsistentOutput = (func, val) => {
    let checkA = val + 2;
    let checkB = func(val);
    return checkA === checkB ? func(val) : 'This function returned inconsistent results';
  }
  
  console.log();
  console.log(checkConsistentOutput(addTwo, 10));

