/*Example #1: Performing basic arithmetic
Remember that the console is a REPL, so we can run JS code, such as arithmetic expressions, 
by typing it after the > prompt and hitting Enter/Return. The expression will be evaluated, 
and the return value is printed to the console on the next line following the < arrow:

basic_arithmetic

Similarly, we can use comparison operators to compare values, which will evaluate to true or false:

expression_evaluation

In some newer browsers, you may notice that the console displays a preview of the return value as you’re typing, 
even before you hit Enter/Return.

Example #2: Calling and writing functions
In addition to performing basic arithmetic, we can also execute any other valid JS code, such as calling functions and methods. 
A list of the built-in functions and objects that are available to use in the console can be found in the MDN web docs. For example, 
Math.sqrt() returns the square root of a number:

calling_methods

The console object can also be accessed in the web browser’s console. Most frequently, it is used to output text and data, 
such as for debugging purposes:

console_logging

Notice that two new lines appear after running the previous code, one preceded by the < arrow and one without. 
This is because console.log() simply prints the message to the console and does not return anything. Thus, 
the first line we see is the logged message, and the second line that starts with < is the return value, or undefined.

We can also write our own functions in the console. In the example below, we define a function called addTwo() 
which logs a message to the console, then returns the input number plus 2:

defining_functions

Because the function declaration itself does not evaluate to any value, undefined is returned and printed to the console after the < arrow.

When we call the addTwo() function, Evaluating... is first outputted to the console from our console.log() call. Then, 
the function’s return value—which is what the function call evaluates to—will get printed after the < arrow:

calling_function

Example #3: Interacting with the page’s DOM
As we’ve seen so far, we can run JS in the console completely independent of the page we have opened in the browser. 
But what makes the console particularly useful is that we could also directly inspect and modify the page’s DOM if we wanted to. 
Let’s look at a simple example using a blank webpage.

To bring up a blank page, we can enter about:blank into the browser’s address bar. We can confirm that there is 
no HTML inside the <body> element of the page by checking document.body.innerHTML in the console:

inspecting_body
We can also write JS code to modify the page’s DOM, such as adding a heading element inside the body, as seen below. 
Once we run the following code, the change will immediately be reflected on the page opened in the browser:

manipulating_body

The console also recognizes $() as an alias for document.querySelector() to select an element. 
This shorthand resembles jQuery syntax and helps make manipulating the DOM through the console even more efficient:

aliasing_dom_selector

In the code above, we used the shorthand $() syntax to select the <body> element and set the color property to "blue". 
This statement returns the value "blue" to the console, and the color change is immediately reflected on the webpage.

Conclusion
As we can see, the console provides a quick and convenient way of running any JS code in the browser, whether independent of or 
directly related to the page content. If any edits are made to the page, the changes are temporary and will be gone upon refreshing, 
which works great for testing purposes when you don’t want to modify the actual code. Combined with the other developer tools offered by 
browsers, we can see how the console can quickly become an essential part of a developer’s toolbox!*/