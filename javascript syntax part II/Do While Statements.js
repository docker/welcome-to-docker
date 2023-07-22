// Create the variable cupsOfSugarNeeded, and assign it a number value of your choosing.
//The cups of sugar must be added to the batter one at a time. Declare the variable cupsAdded and assign it the value 0.
//Create a do...while loop which increments cupsAdded by one while cupsAdded is less than cupsOfSugarNeeded.
//We have a sweet tooth, so we want to add at least one cup of sugar to the batter even if the value of cupsOfSugarNeeded is 0.
//In order to help us visualize the output on each iteration of the loop, 
//add a console.log within the do...while block and log the value of cupsAdded.

/*let cupsOfSugarNeeded = 5;
let cupsAdded = 0;

do {
  cupsAdded++;
  console.log(cupsAdded);
} while (cupsAdded < cupsOfSugarNeeded);*/


//Log each element from rapperArray in a for loop with the iterator variable i.
//After the for loop, log the string "And if you don't know, now you know." to the console. Note: since there’s a single quote character
//Add a break inside your loop’s block that breaks out of the loop if the element at 
//the current index in the rapperArray is 'Notorious B.I.G.'. Log the element before breaking out of the loop.
const rapperArray = ["Lil' Kim", "Jay-Z", "Notorious B.I.G.", "Tupac"];

for (let i = 0; i < rapperArray.length; i++) {
  console.log(rapperArray[i]); {
    if (rapperArray[i] === "Notorious B.I.G.") {
        break;
    }
  }
}
console.log("And if you don't know, now you know.");







