// Write a function, truthyOrFalsy(), that takes in any value and returns true if that value is truthy and false if that value is falsy.
function truthyOrFalsy(value) {
    if (value) {
        return true;
    } else {
        return false;
    }
}

/*
In JavaScript, not only specific values like true or false are considered truthy or falsy, 
but there are also other values that are evaluated as such. Here's a brief explanation:

truthyOrFalsy('Hello'): In this case, a non-empty string is considered truthy. Any non-empty string is evaluated as true in JavaScript.

truthyOrFalsy(true): The boolean value true is already a truthy value. It is a direct representation of the truth in boolean logic.

In JavaScript, values that are considered falsy include false, 0, '' (empty string), null, undefined, and NaN. All other values, 
including non-empty strings, objects, and true, are evaluated as truthy.

The truthyOrFalsy() function checks the truthiness of the input values based on these rules and returns true for truthy values 
and false for falsy values.*/

/*In JavaScript, an empty object {} is considered a value. It represents an empty container or an object with no properties. 
Even though the object is empty, it still exists as an object in memory.

When evaluating truthiness or falsiness in JavaScript, empty objects (and all objects in general) are considered truthy values. 
This means that when you pass an empty object {} to the truthyOrFalsy() function, the condition if (value) evaluates to true, 
indicating that the value is truthy.

It's important to note that truthiness and falsiness in JavaScript are based on a set of rules defined by the language. 
These rules determine how values are interpreted in boolean contexts. Empty objects are one of the values that are considered 
truthy according to these rules.*/

