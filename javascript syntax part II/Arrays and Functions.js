const concept = ['arrays', 'can', 'be', 'mutated'];

function changeArr(arr){
  arr[3] = 'MUTATED';
}

changeArr(concept);

//In main.js, there is an array concept. There is also a function changeArr that will assign the element in index 3 of an array to 'MUTATED'. The function changeArr was called with an argument of concept.
//Underneath the function call, log concept to the console to check if this reassignment mutated the array.
console.log(concept);

//Under the console.log() statement, define another function named removeElement that takes a parameter of newArr. Inside the function body call .pop() on newArr.
function removeElement(newArr){
  newArr.pop();
}

//Call removeElement() with an argument of concept.
console.log(removeElement(concept));

//After calling removeElement(concept), check the value of concept by logging it to console.
removeElement(concept);
console.log(concept);


//In main.js, there is an array concept. There is also a function changeArr that will assign the element in index 3 of an array to 'MUTATED'. The function changeArr was called with an argument of concept.
//Underneath the function call, log concept to the console to check if this reassignment mutated the array.
console.log(concept);

//Under the console.log() statement, define another function named removeElement that takes a parameter of newArr. Inside the function body call .pop() on newArr.
function removeElement(newArr){
  newArr.pop();
}
