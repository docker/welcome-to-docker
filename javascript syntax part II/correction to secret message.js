let secretMessage = ['Learning', 'is', 'not', 'about', 'what', 'you', 'get', 'easily', 'the', 'first', 'time,', 'it', 'is', 'about', 'what', 'you', 'can', 'figure', 'out.', '-2015,', 'Chris', 'Pine,', 'Learn', 'JavaScript'];

secretMessage.pop(); // Remove the last string from the array

secretMessage.push('to', 'Program'); // Add 'to' and 'Program' to the end of the array

secretMessage[secretMessage.indexOf('easily')] = 'right'; // Change 'easily' to 'right'

secretMessage.shift(); // Remove the first string from the array

secretMessage.unshift('Programming'); // Add 'Programming' to the beginning of the array

secretMessage.splice(6, 5, 'know,'); // Remove 'get', 'right', 'the', 'first', 'time,' and replace them with 'know,'

console.log(secretMessage.join(' ')); // Print the secret message as a sentence
