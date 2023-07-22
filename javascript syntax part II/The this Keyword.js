/*Let’s create a new object to practice using this.

In main.js there is an object robot, add a property of model and assign to it a value of '1E78V2'. Add another property, energyLevel and assign to it a value of 100.*/
/*Now to check .provideInfo() has access to the internal properties of robot. Log the result of calling .provideInfo() method on robot to the console.*/

const robot = {
    model: '1E78V2',
    energyLevel: 100,
    provideInfo() {
      return `I am ${this.model} and my current energy level is ${this.energyLevel}.`;
    }
  };
  
  console.log(robot.provideInfo());
  
