/*
  const robot = {
    energyLevel: 100,
    checkEnergy: () => {
      console.log(`Energy is currently at ${this.energyLevel}%.`)
    }
  }
  
  robot.checkEnergy();

Currently the .checkEnergy() method is not producing the correct output because it is using arrow function syntax.
Refactor, or change, the method to use a function expression. You can write the function using either longhand or shorthand format.
After refactoring the method, notice that .checkEnergy() has access to the other internal properties of the robot object.
  
  //Answer

  /*const robot = {
    energyLevel: 100,
    checkEnergy() {
        console.log(`Energy is currently at ${this.energyLevel}%.`)
    } 
  }  // arrow function syntax is not allowed here  because*/

 /* const robot = {
    _energyLevel: 100,
    recharge(){
      this._energyLevel += 30;
      console.log(`Recharged! Energy is currently at ${this._energyLevel}%.`)
    }
  };
  Below the robot object, reassign the _energyLevel property to 'high'.
 
  //Answer
  robot._energyLevel = 'high';

/*
Now take a look at the new recharge method in robot. .recharge() will add 30 to _energyLevel.
What will happen now that _energyLevel isn’t a number?
Call .recharge() on robot to find out.

//Answer

  robot.recharge();

Notice that a funky string is printed to the console! This is known as a side-effect of type-coercion. 
No need to worry about what this means for now, but it’s important to understand that you can cause unwanted 
side-effects when mutating objects and their properties.
robot.recharge(); */
 

/*
In robot, create a getter method named energyLevel using the get keyword. Leave function body blank for now.*/
/*Inside the getter method, add an if statement to check if this._energyLevel is a number using the typeof operator. 
If that condition is truthy, return 'My current energy level is ENERGYLEVEL'. Replace ENERGYLEVEL with the value of this._energyLevel.

Make sure you return the string and not logging it to the console.*/
/*If this._energyLevel isn’t a number it could be that the _energyLevel property was altered. Let’s add a 
default return statement for when such a scenario arises.
Add an else statement that returns 'System malfunction: cannot retrieve energy level'.*/
/*Log the result of calling the getter method energyLevel on robot to the console.

Notice that the method will return a formatted response rather than just accessing a property!*/

/*const robot = {
    _model: '1E78V2',
    _energyLevel: 100,
    get energyLevel(){
        if (typeof this._energyLevel === 'number'){
        return `My current energy level is ${this._energyLevel}`;
      } else {
        return 'System malfunction: cannot retrieve energy level';
      }
    } 
  };
  console.log(robot.energyLevel);*/

  /*Currently, in robot there is a getter method for numOfSensors but no setter method! What if we need to 
  add or remove some sensors? Let’s fix that problem.
Add a setter method named numOfSensors using the set keyword. Provide a parameter of num. Leave the function body empty for now.*/
/*There are a couple of things we should do in the setter method:

Add a check to see if num is a number using the typeof operator.
num should also be greater than or equal to 0.
If both conditions are met, reassign this._numOfSensors to num.*/
/*Now add an else that logs 'Pass in a number that is greater than or equal to 0' to the console.*/
/*Did you use an if statement to check if the argument passed to this._numOfSensors is a number?*/
/*Use the numOfSensors setter method on robot to assign _numOfSensors to 100.*/

/*const robot = {
    _model: '1E78V2',
    _energyLevel: 100,
    _numOfSensors: 15,
    set numOfSensors(num) {
      if (typeof num === 'number' && num >= 0) {
        this._numOfSensors = num;
      } else {
        console.log('Pass in a number that is greater than or equal to 0');
      }
    } 
  };
  robot.numOfSensors = 100;
  console.log(robot.numOfSensors);*/

/*Create a factory function named robotFactory that has two parameters model and mobile. Make the function return an object. 
In the object, add a key of model with the value of the model parameter. Add another property that has a key of mobile with a value of 
the mobile parameter.

Then add a method named beep without a parameter that will log 'Beep Boop' to the console.
Use your factory function by declaring a const variable named tinCan. 
Then, in the const variable, assign to it the value of calling robotFactory with the first argument of 'P-500' and the second argument of true.
Let’s now check what tinCan can do! Call .beep() on tinCan.
You should see 'Beep Boop' printed to the console which means the factory function produced a robot object! 
Play around with tinCan to check the other properties

//answer

const robotFactory = (model, mobile) => {
    return {
      model: model,
      mobile: mobile,
      beep() {
        console.log('Beep Boop');
      }
    }
  }
  const tinCan = robotFactory('P-500', true);
  tinCan.beep();
  */

/* Use the property value shorthand and refactor the factory function in main.js
const robotFactory = (model, mobile) => {
  return {
    model: model,
    mobile: mobile,
    beep() {
      console.log('Beep Boop');
    }
  }
}

// To check that the property value shorthand technique worked:
const newRobot = robotFactory('P-501', false)
console.log(newRobot.model)
console.log(newRobot.mobile)

//answer

const robotFactory = (model, mobile) => {
  return {
    model,
    mobile,
    beep() {
    }
  }
} 
const newRobot = robotFactory('P-501', false);
console.log(newRobot.model);
console.log(newRobot.mobile);
*/

/*Use destructured assignment to create a const variable named functionality that extracts the functionality property of robot.
If you need a reminder on how to use destructured assignment, review the example in the narrative or check the hint.
Since functionality is referencing robot.functionality we can call the methods available to robot.functionality simply through functionality.
Take advantage of this shortcut and call the .beep() method on functionality.

//Answer 

const robot = {
  model: '1E78V2',
  energyLevel: 100,
  functionality: {
    beep() {
      console.log('Beep Boop');
    },
    fireLaser() {
      console.log('Pew Pew');
    },
  }
};
const { functionality } = robot;
functionality.beep();
*/ 

/*In main.js there is an object, robot. We’d like to grab the property names, otherwise known as keys, and 
save the keys in an array which is assigned to robotKeys. However, there’s something missing in the method call.
What is missing in the following method call?*

const robot = {
	model: 'SAL-1000',
  mobile: true,
  sentient: false,
  armor: 'Steel-plated',
  energyLevel: 75
};

const robotKeys = Object.keys();
Answer
const robotKeys = Object.keys(robot);
console.log(robotKeys);

Object.entries() will also return an array, but the array will contain more arrays that have both the key and value of the properties in an object.
Declare a const variable named robotEntries and assign to it the entries of robot by calling Object.entries().
// Declare robotEntries below this line: 

Answer 
const robotEntries = Object.entries(robot);
console.log(robotEntries);

/*Now what if we want another object that has the properties of robot but with a few additional properties. 
Object.assign() sounds like a great method to use, Declare a const variable named newRobot. 
newRobot will be a new object that has all the properties of robot and the properties in the following object: 
{laserBlaster: true, voiceRecognition: true}. Make sure that you are not changing the robot object!

Declare newRobot below this line: 

Answer
const newRobot = Object.assign({laserBlaster: true, voiceRecognition: true}, robot);
console.log(newRobot);*/




  


