//Now, make your own! Create a program that loops from 5 to 10 and logs each number to the console.

for (let i = 5; i <= 10; i++) {
    console.log(i);
}

//Make a for loop that loops backwards printing 3 to 0 to the console. Use the >= comparison operator in your stopping condition and the -- operator in your iteration statement.

for (let i = 3; i >= 0; i--) {
    console.log(i);
}  

//const vacationSpots = ['Bali', 'Paris', 'Tulum'];

/*Imagine you’re a big-wig programmer for a social media platform! You have been tasked with building a prototype for a mutual followers program. 
You’ll need two arrays of “friends” from two mock users so that you can extract the names of the followers who exist in both lists. 
Make a variable called bobsFollowers and set it equal to an array with four strings representing the names of Bob’s friends.*/

/*Make a variable called tinasFollowers and set it equal to an array with three strings representing the names of Tina’s friends. 
Make exactly two of these the same as two of the friends in the bobsFollowers array.
Create a nested loop that iterates through bobsFollowers as the array for the outer loop and tinasFollowers as the array for the inner loop. 
If the current element from the outer loop is the same as the current element from the inner loop, 
push that element into the mutualFollowers array.*/
const tinasFollowers = ['Tina', 'Joe', 'Jack'];
const bobsFollowers = ['Bob', 'Joe', 'Jack'];
const mutualFollowers = [];
for (let i = 0; i < bobsFollowers.length; i++) {
    for (let j = 0; j < tinasFollowers.length; j++) {
        if (bobsFollowers[i] === tinasFollowers[j]) {
            mutualFollowers.push(bobsFollowers[i]);
            console.log(mutualFollowers);
        }
    }
}


