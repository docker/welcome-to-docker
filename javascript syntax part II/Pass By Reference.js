//Write a function greenEnergy() that has an object as a parameter and sets that object’s 'Fuel Type' property to 'avocado oil'.
let spaceship = {
    'Fuel Type' : 'Turbo Fuel',
    homePlanet : 'Earth'
  };
  // Write your code below
  function greenEnergy(obj){
    obj['Fuel Type'] = 'avocado oil';
    return obj;
  }
  //Write a function remotelyDisable() that has an object as a parameter and sets (or reassigns) that object’s disabled property to true.
 function remoteDisable(obj){
    obj.disabled = true;
   return obj;
 }
 //Call your two functions with the spaceship object in the code editor, then console.log() the spaceship object to confirm those properties were changed/added.
console.log(greenEnergy(spaceship));
console.log(remoteDisable(spaceship));
console.log(spaceship);
