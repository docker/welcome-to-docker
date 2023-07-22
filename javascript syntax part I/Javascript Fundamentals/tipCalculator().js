//Create a function, tipCalculator(), that has two parameters, a string representing the quality of the service received and a number representing the total cost.

function tipCalculator(quality, total) {
    switch (quality) {
    case "bad":
      return total * 0.05; //"bad" --> 5%
    case "ok":
      return total * 0.15; //'ok' should return a 15% tip
    case "good":
      return total * 0.2; //'good' should return a 20% tip
    case "excellent":
      return total * 0.3; //'excellent' should return a 30% tip
    default:
      return total * 0.18; //all other inputs should default to 18%
  }

}

/////////////////////////////////////////////////////////////////////////////////////////////////

//Write a function, toEmoticon(), that takes in a string and returns the corresponding emoticon as a string. 
//Use a switch/case, and cover these cases:

// Write your function here:
function toEmoticon(string) {
    switch (string) {
  //'shrug' should return '|_{"}_|'
    case 'shrug':
        return '|_{"}_|';
    //'smiley face' should return ':)'
    case 'smiley face':
        return ':)';
    //'frowny face' should return':('
    case 'frowny face':
        return ':(';
        //'winky face' should return ';)'
    case 'winky face':
        return ';)';
    //'heart' should return '<3'
    case 'heart':
        return '<3';
        //all other inputs should return '|_(* ~ *)_|'
    default:
          return '|_(* ~ *)_|';
    }
}

console.log(toEmoticon("whatever")) 

// Uncomment the line below when you're ready to try out your function
// console.log(toEmoticon("whatever")) 
// Should print  '|_(* ~ *)_|'

// We encourage you to add more function calls of your own to test your code!

