const cards = ['diamond', 'spade', 'heart', 'club'];

// Write your code below
//Below the cards array, declare a variable, currentCard, with the let keyword but don’t assign it a value.

let currentCard;

while (currentCard !== 'spade') {
  currentCard = cards[Math.floor(Math.random() * 4)];
  console.log(currentCard);
}
