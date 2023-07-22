const myAge = 32;
//Create a variable named myName, and set it equal to your name as a string.

let earlyYears = 2;
//Create a variable named lateYears and save the value 2.

earlyYears *= 10.5;
//Use the addition assignment operator to add the value saved to lateYears to the value saved to earlyYears and reassign it to lateYears.

let laterYears = myAge - earlyYears;
//Use the subtraction assignment operator to subtract the value saved to lateYears from the value saved to earlyYears and reassign it to laterYears.

laterYears *= 4;
//Multiply the laterYears variable by 4 to calculate the number of dog years accounted for by your later years.

let myAgeInDogYears = earlyYears + laterYears;
//Use the addition assignment operator to add the value saved to earlyYears to the value saved to laterYears and reassign it to myAgeInDogYears.

let myName = "Carlos Campos";
myName = myName.toLowerCase();
//Use the assignment operator to change the value of the variable named myName to the string "john doe".

console.log(`My name is ${myName}. I am ${myAgeInDogYears} years old in dog years.`);
//Write a console.log statement that displays your name and age in dog years. Use string interpolation to display the value in the following sentence: 
//My name is NAME. I am HUMAN AGE years old in human years which is DOG AGE years old in dog years.