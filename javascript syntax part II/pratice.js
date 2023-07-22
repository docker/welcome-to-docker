//Given the spellingWord, use a for...of loop to log each letter using console.log().
const spellingWord = 'hippopotamus';

for (const letter of spellingWord) {
    console.log(letter);
}



/*Write a for...of loop that iterates through our pokemonList array.

Inside the block of the for...of loop, use console.log() and string interpolation as modeled above to log each element in 
the pokemon array within the string 'You caught a 'X'!' For example, the first iteration of the loop should print ‘You caught a Pikachu!’ 
to the console.
One of the elements, 'Yoshi', is not a Pokemon. If you encounter 'Yoshi', 
use continue to skip this element before it is logged to the console.*/

const pokemonList = ['Pikachu', 'Charizard', 'Squirtle', 'Yoshi', 'Snorlax'];

for (const pokemon of pokemonList) {
    console.log(pokemon);
}

for (const pokemon of pokemonList) {
    if (pokemon === 'Yoshi') {
        continue;
    }
    console.log(`You caught a ${pokemon}!`);
}

//Write a for...of loop that iterates through our pokemonList array.



