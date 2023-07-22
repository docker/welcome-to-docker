const kelvin = 100;
//Create a variable named celsius, and set it equal to kelvin - 273.15.
const celsius = kelvin - 273;
//Let’s convert Celsius to Fahrenheit by multiplying by 9/5 and adding 32. Store the result in another variable, named fahrenheit.
let fahrenheit = Math.floor(celsius * (9 / 5) + 32);
//Print the value of fahrenheit to the console.

console.log(`The temperature in fahrenheit is ${fahrenheit} degrees Fahrenheit.`);
//Print the value of celsius to the console.

//Convert celsius to the Newton scale using the equation below
let newton = (celsius * (33/100));
console.log(newton);

//round the number to the nearest whole number
newton = Math.round(newton);

//Use console.log and string interpolation to log the temperature in newton to the console
console.log(`The temperature in Newton is ${newton} degrees Newton.`);
