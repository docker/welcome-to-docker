//Write a function factorial() that takes a number as an argument and returns the factorial of the number.

function factorial(num) {
    if (num === 0) {
        return 1;
    }
    return num * factorial(num - 1);
}
console.log(factorial(5));
/*Write a function subLength() that takes 2 parameters, a string and a single character. 
The function should search the string for the two occurrences of the character and return the length between them including the 2 characters. 
If there are less than 2 or more than 2 occurrences of the character the function should return 0.
console.log(subLength('momentum', 'm')); // This will correctly return 0
console.log(subLength('funny', 'n')); // This will correctly return 2*/

// Write function below
const subLength = (str, char) => {
    let charCount = 0;
    let len = -1;

    for (let i=0; i<str.length; i++) {
        if (str[i] == char) {
            charCount++;
            if (charCount > 2) {
                return 0;
            }
            if (len == -1) {
                len = i;
            } else {
                len = i - len + 1
            }
        }
    }  
    if (charCount < 2) {
        return 0;
    } 
    return len;
};

/*
This code defines a JavaScript function named `subLength` that takes two parameters: `str`, which is a string, and `char`, 
which is a single character.

Here's a breakdown of what the code does:

1. `let charCount = 0;` and `let len = -1;`: These variables are initialized to keep track of the number of occurrences of the character `char` 
and the length between the two occurrences.

2. The function uses a `for` loop to iterate through each character of the input string `str`.

3. `if (str[i] == char)`: It checks if the current character in the string matches the specified character `char`.

4. If there's a match, `charCount` is incremented to count the occurrence.

5. Inside the matching condition, there are two nested conditional blocks:
   - `if (charCount > 2)`: If there are more than two occurrences of the character, the function returns `0`, indicating 
   that there are too many occurrences.
   - `if (len == -1) { len = i; } else { len = i - len + 1; }`: This calculates the length between the two occurrences. 
   If it's the first occurrence, it stores the index `i` in `len`. If it's the second occurrence, it calculates the length 
   by subtracting the stored index `len` from the current index `i` and adds `1`. This length is used as the result if there are 
   exactly two occurrences.

6. After the loop, there's another check: `if (charCount < 2) { return 0; }`. If there are less than two occurrences of the character, 
the function returns `0`, indicating that there are too few occurrences.

7. Finally, if the function hasn't returned `0` at any point, it returns the calculated length `len`, which represents 
the length between the two occurrences of the character in the string.

The purpose of this function is to find the length between the first and second occurrences of a specified character in a given string. 
If there are more or fewer than two occurrences, it returns `0`.
*/

/*
Write a function groceries() that takes an array of object literals of grocery items. 
The function should return a string with each item separated by a comma except the last two items should be separated by the word 'and'. 
Make sure spaces (' ') are inserted where they are appropriate.

Examples:

groceries( [{item: 'Carrots'}, {item: 'Hummus'}, {item: 'Pesto'}, {item: 'Rigatoni'}] );
// returns 'Carrots, Hummus, Pesto and Rigatoni'

groceries( [{item: 'Bread'}, {item: 'Butter'}] );
// returns 'Bread and Butter'

groceries( [{item: 'Cheese Balls'}] );
// returns 'Cheese Balls'*/


/*const groceries = (arr) => {
    let str = '';
    for (let i=0; i<arr.length; i++) {
        if (i == arr.length-1) {
            str += arr[i].item;
        } // In here you are missing the "else"  before the  if (i == arr.length-2) {
            str += arr[i].item + ' and ';
        } // here you need " else { and the content below goes here}"
        str += arr[i].item + ', ';
    }
    return str;
};
*/
const groceries = (arr) => {
    let str = '';
    for (let i = 0; i < arr.length; i++) {
        if (i === arr.length - 1) {
            str += arr[i].item;
        } else if (i === arr.length - 2) {
            str += arr[i].item + ' and ';
        } else {
            str += arr[i].item + ', ';
        }
    }
    return str;
};

console.log(groceries([{ item: 'Carrots' }, { item: 'Hummus' }, { item: 'Pesto' }, { item: 'Rigatoni' }]));
// Returns 'Carrots, Hummus, Pesto, and Rigatoni'

console.log(groceries([{ item: 'Bread' }, { item: 'Butter' }]));
// Returns 'Bread and Butter'

console.log(groceries([{ item: 'Cheese Balls' }]));
// Returns 'Cheese Balls'





