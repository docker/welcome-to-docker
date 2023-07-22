//Create the variable vacationSpots, and assign its value to an array of three strings naming places you’d like to visit.

let vacationSpots = ["Paris", "Tokyo", "Seoul"];

//Print the vacationSpots array to the console.

//Next, console.log() each item in vacationSpots. Since we don’t know loops yet, we have to console.log() each element in the array separately.

console.log(vacationSpots[0]);

console.log(vacationSpots[1]);

console.log(vacationSpots[2]);

//Nice work! Now imagine that the vacation list had 100 places on it— logging each array element to the console by hand would be a tedious task! In the next exercise, we will learn how to make things more efficient with for loops.

//Next, we’ll add another item to the vacationSpots array.

vacationSpots.push("New York");

//Now, print the vacationSpots array to the console again.

console.log(vacationSpots[3]);

//Now, let’s loop over the vacationSpots array and console.log() each item in the array.

for (let i = 0; i < vacationSpots.length; i++) {
  console.log(vacationSpots[i]);
}

//Now, let’s loop over the vacationSpots array and console.log() each item in the array.

for (let i = 0; i < vacationSpots.length; i++) {
    console.log(vacationSpots[i]);
    if (vacationSpots[i] === "Seoul") {
        console.log("I love Seoul!");
        break;
    }
}