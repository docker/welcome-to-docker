let userName = ''; // Variable to store user name

// Ternary expression to check if user name is empty or not
let greeting = userName !== '' ? `Hello, ${userName}!` : 'Hello!';
console.log(greeting);

let userQuestion = "Will I have a great day tomorrow?"; // User's question
console.log(`${userName ? userName + ' asks:' : 'User asks:'} ${userQuestion}`);

let randomNumber = Math.floor(Math.random() * 8); // Generating a random number between 0 and 7
console.log(randomNumber);

let eightBall = ''; // Variable to store the Magic Eight Ball's response

// Control flow using switch statement to assign a response to the eightBall variable based on randomNumber
switch (randomNumber) {
  case 0:
    eightBall = 'It is certain';
    break;
  case 1:
    eightBall = 'It is decidedly so';
    break;
  case 2:
    eightBall = 'Reply hazy try again';
    break;
  case 3:
    eightBall = 'Cannot predict now';
    break;
  case 4:
    eightBall = 'Do not count on it';
    break;
  case 5:
    eightBall = 'My sources say no';
    break;
  case 6:
    eightBall = 'Outlook not so good';
    break;
  case 7:
    eightBall = 'Signs point to yes';
    break;
}

console.log(eightBall); // Outputting the Magic Eight Ball's response





