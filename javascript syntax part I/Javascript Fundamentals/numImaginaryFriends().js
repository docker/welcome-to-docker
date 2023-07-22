//Write a function, numImaginaryFriends(), that takes in the total number of friends a person has and returns the number of imaginary friends they have.
//Since friends can only come in whole numbers, be sure to round your result up to the nearest whole number before returning it.
function numImaginaryFriends(totalFriends) {
    return Math.ceil(totalFriends * .25);
    }
    console.log(numImaginaryFriends(10));

/*function numImaginaryFriends(totalFriends): This line declares a function named numImaginaryFriends 
that takes in a parameter totalFriends, representing the total number of friends a person has.

return Math.ceil(totalFriends * .25);: This line calculates the number of imaginary friends by multiplying the totalFriends parameter by 0.25 
(which represents 25% or 1/4). The result is passed to the Math.ceil() function, which rounds up to the nearest whole number.

console.log(numImaginaryFriends(10));: This line calls the numImaginaryFriends() function with an argument of 10 and logs the returned value 
to the console.

So, when you run numImaginaryFriends(10), it calculates 25% of 10 (which is 2.5), and rounds it up to the nearest whole number using Math.ceil(), 
resulting in 3. Finally, 3 is logged to the console.*/
