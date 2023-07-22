//The user should be able to choose ‘rock’, ‘paper’, or ‘scissors’ when the game starts.
console.log('hi');
const getUserChoice = (userInput) => {
  userInput = userInput.toLowerCase();
  
  if (userInput === 'rock' || userInput === 'paper' || userInput === 'scissors') {
    return userInput;
  } else {
    console.log('Error: Invalid input!');
  }
};

const getComputerChoice = () => {
  const randomNumber = Math.floor(Math.random() * 3);
  
  switch (randomNumber) {
    case 0:
      return 'rock';
    case 1:
      return 'paper';
    case 2:
      return 'scissors';
  }
};

const determineWinner = (userChoice, computerChoice) => {
  if (userChoice === computerChoice) {
    return "It's a tie!";
  } else if (userChoice === 'rock') {
    if (computerChoice === 'paper') {
      return "Computer wins!";
    } else {
      return "User wins!";
    }
  } else if (userChoice === 'paper') {
    if (computerChoice === 'scissors') {
      return "Computer wins!";
    } else {
      return "User wins!";
    }
  } else if (userChoice === 'scissors') {
    if (computerChoice === 'rock') {
      return "Computer wins!";
    } else {
      return "User wins!";
    }
  }
};

const playGame = () => {
  const userChoice = getUserChoice('scissors');
  const computerChoice = getComputerChoice();
  console.log('User choice: ' + userChoice);
  console.log('The computer choice: ' + computerChoice);
  console.log(determineWinner(userChoice, computerChoice));
};

  //Play the game 
  playGame();



