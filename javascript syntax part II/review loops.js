let groceryList = ['orange juice', 'bananas', 'coffee beans', 'brown rice', 'pasta', 'coconut oil', 'plantains'];
/*Loops perform repetitive actions so we don’t have to code that process manually every time.
How to write for loops with an iterator variable that increments or decrements
How to use a for loop to iterate through an array
A nested for loop is a loop inside another loop
while loops allow for different types of stopping conditions
Stopping conditions are crucial for avoiding infinite loops.
do...while loops run code at least once— only checking the stopping condition after the first execution
The break keyword allows programs to leave a loop during the execution of its block*/

for (let i = 0; i < groceryList.length; i++) {
    console.log(groceryList[i]);
}

for (let i = groceryList.length - 1; i >= 0; i--) {
    console.log(groceryList[i]);
    if (groceryList[i] === 'coffee beans') {
        break;
    }
}

for (let i = 0; i < groceryList.length; i++) {
    if (groceryList[i] === 'coffee beans') {
        continue;
    }
    console.log(groceryList[i]);
}

let i = 0;

while (i < groceryList.length) {
    console.log(groceryList[i]);
    i++;
    if (groceryList[i] === 'coffee beans') {
        break;
    }
}

