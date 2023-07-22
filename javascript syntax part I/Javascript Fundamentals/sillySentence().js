//Write a function, sillySentence(), that has 3 string parameters and returns the following silly sentence with the blanks filled in by the arguments passed into the function: I am so    because I      coding! Time to write some more awesome     !
function sillySentence(exiceted, love, functions) {
    return `I am so ${excited} because I ${love} coding! Time to write some more awesome ${functions} !`;
    sillySentence(excited, love, functions); // <--- Incorrect 
} // <-- Incorrect 


//////// ////////////////////////////////////////   CORRECT WAY ///////////////////////////////////

function sillySentence(excited, love, functions) {
    return `I am so ${excited} because I ${love} coding! Time to write some more awesome ${functions}!`;
  }
  
  const excited = 'excited';
  const love = 'love';
  const functions = 'functions';
  
  console.log(sillySentence(excited, love, functions));

/*There are a couple of issues with your code. Let's go through them one by one:

The function definition is incorrect. It should be function sillySentence(excited, love, functions) { ... }. 
You have misspelled the parameter names (exiceted instead of excited).

Inside the function, you are using template literals to construct the sentence, which is correct. However, the variables ${excited}, ${love}, 
and ${functions} should be enclosed in backticks () instead of regular quotes (''). So it should be I am so ${excited} because I ${love} coding! 
Time to write some more awesome ${functions}!``.

You are calling the sillySentence() function inside the function definition itself. This is unnecessary. The function should be called separately 
outside the function definition. So move the line sillySentence(excited, love, functions); outside the function.

By defining the variables with values like const excited = 'excited';, const love = 'love';, and const functions = 'functions';, 
you are providing the necessary values for the function call. This way, when you call sillySentence(excited, love, functions);, 
the function will receive the correct values and construct the silly sentence with them.
*/



