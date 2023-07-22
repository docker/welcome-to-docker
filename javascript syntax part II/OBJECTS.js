/*The spaceship we have so far looks good but, unfortunately, is not very fast at hyperspace travel due to having an inferior fuel source. Make a new spaceship object named fasterShip with the same color as spaceship but with a Fuel Type equal to 'Turbo Fuel'.*/

/*let fasterShip = {
    'Fuel Type': 'Turbo Fuel', color: 'silver'
};

let spaceship = {
    homePlanet: 'Earth',
    color: 'silver',
    'Fuel Type': 'Turbo Fuel',
    numCrew: 5,
    flightPath: ['Venus', 'Mars', 'Saturn']
  };
  //Let’s use the dot operator to access the value of numCrew from the spaceship object in the code editor. Create a variable crewCount and assign the spaceship‘s numCrew property to it.
  let crewCount = spaceship.numCrew;
  //Again using the dot operator, create a variable planetArray and assign the spaceship‘s flightPath property to it.
  let planetArray = spaceship.flightPath;*/

  /*let spaceship = {
    'Fuel Type' : 'Turbo Fuel',
    'Active Mission' : true,
    homePlanet : 'Earth', 
    numCrew: 5
   };
  
  let propName =  'Active Mission';
  
  // Write your code below
  /*Let’s use bracket notation to access the value of 'Active Mission' from the spaceship object in the code editor. Create a variable isActive and assign the spaceship‘s 'Active Mission' property to it.*/
  /*let isActive = spaceship['Active Mission'];
  /*Using bracket notation and the propName variable provided, console.log() the value of the 'Active Mission' property.*/
  /*console.log(spaceship[propName]);*/

  let spaceship = {
    'Fuel Type' : 'Turbo Fuel',
    homePlanet : 'Earth',
    color: 'silver',
    'Secret Mission' : 'Discover life outside of Earth.'
  };

// Write your code below
spaceship.color = 'glorious gold';
spaceship.numEngines = 8;
delete spaceship['Secret Mission'];

// Write your code below
/*Below the retreatMessage variable in the code editor, create an alienShip object. It should contain a method retreat() which will console.log() the retreatMessage.*/
/*Add another method to your object literal. This method, takeOff(), should console.log() the string 'Spim... Borp... Glix... Blastoff!'.*/
/*Invoke your two methods: first .retreat() then .takeOff().*/
let retreatMessage = 'We no longer wish to conquer your planet. It is full of dogs, which we do not care for.';

// Write your code below
let alienShip = {
  retreat: function() {
    console.log(retreatMessage);
  },
  takeOff: function() {
    console.log('Spim... Borp... Glix... Blastoff!');
  }
}
alienShip.retreat();
alienShip.takeOff();





  

