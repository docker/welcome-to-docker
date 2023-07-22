const chores = ['wash dishes', 'do laundry', 'take out trash', 'cook dinner', 'mop floor'];

//Use the .pop() method to remove the last element from chores.
chores.pop();

//In a line after you called chores.pop(), log chores to the console to make sure it worked.
console.log(chores);

const groceryList = ['orange juice', 'bananas', 'coffee beans', 'brown rice', 'pasta', 'coconut oil', 'plantains'];

//Use the .shift() method to remove the first item from the array groceryList.

groceryList.shift();

//Log the new groceryList to the console.

console.log(groceryList);

//Under the code added in step 1, use the .unshift() method to add 'popcorn' to the beginning of your grocery list.


groceryList.unshift('popcorn');

//After calling .unshift() on groceryList, log groceryList to the console.

console.log(groceryList);


//You’re in a hurry so you decide to ask a friend to help you with your grocery shopping. You want him to pick up the 'bananas', 'coffee beans', and 'brown rice'.
//Under the code you added for step 2, use .slice() to provide your friend with a list of these three things.

const friendList = groceryList.slice(1,4);

//Log friendList to the console.

console.log(friendList);

//You’re in a hurry so you decide to ask a friend to help you with your grocery shopping. You want him to pick up the 'orange juice', 'coffee beans', and 'brown rice'.
//Under the code you added for step 2, use .slice() to provide your friend with a list of these three things.

console.log(groceryList.slice(1,4));

//Notice that the groceryList array still contains the same items it had in Step 2. That means .slice() is non-mutating! You can confirm this in the link in the previous step.

console.log(groceryList.slice())

//Let’s find the index of a particular element in groceryList using .indexOf().


console.log(groceryList.indexOf('coffee beans'));

//Call .indexOf() on groceryList to find the index of the element 'pasta' and save the returned value to a const variable named pastaIndex.

const pastaIndex = groceryList.indexOf('pasta');

//Then log pastaIndex to the console. (You may remove the other console.log() statements to declutter the terminal.)

console.log(pastaIndex);
// .indexOf() returns -1 if the element is not found.

//Use .indexOf() to find the index of the element 'coconut oil' and save the returned value to a const variable named oilIndex.

const oilIndex = groceryList.indexOf('coconut oil');

//Then log oilIndex to the console. (You may remove the other console.log() statements to declutter the terminal.)

console.log(oilIndex);

//Use .indexOf() to find the index of the element 'plantains' and save the returned value to a const variable named plantainsIndex.

const plantainsIndex = groceryList.indexOf('plantains');

//Then log plantainsIndex to the console. (You may remove the other console.log() statements to declutter the terminal.)

console.log(plantainsIndex);

//Use .indexOf() to find the index of the element 'bananas' and save the returned value to a const variable named bananasIndex.

const bananasIndex = groceryList.indexOf('bananas');



