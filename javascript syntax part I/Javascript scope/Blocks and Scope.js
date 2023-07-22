const city = 'New York City'; //At the top of main.js, declare a const variable, named city set equal to 'New York City'. 
//This variable will exist outside of the block.

function logCitySkyline () {
  let skyscraper = 'Empire State Building';
  return 'The stars over the ' + skyscraper + ' in ' + city;
} //Below the city variable, write a function named logCitySkyline.

console.log (logCitySkyline());
//You’ll notice that the logCitySkyline() function is able to access both variables without any problems. 
//In the next exercise we’ll consider why would it be preferable to have one variable outside of a block and the other inside of a block.
