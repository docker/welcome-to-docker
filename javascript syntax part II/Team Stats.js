/*Let’s make a data structure to store the information about our team. Declare a const variable called team and set it to an empty object.
Our team has players and the games that they have played. Let’s represent both of these by adding two properties to your team object. Add a _players property and a _games property and initialize both to empty arrays.
Next, populate the empty_players array with three players. Each player should be an object containing three properties: firstName, lastName, and age. Put each player on a new line to prevent the line from getting too long.
Let’s do the same for our _games array. Populate the empty array with three games. Each game should be an object containing three properties: opponent, teamPoints, opponentPoints.
Create a getter method called players to retrieve the _players property. Inside the getter method, return the _players property.
For the scope of this project, we won’t need to create setter methods, because we don’t want anyone to change the data saved to the properties.
Create another getter method called games to retrieve the _games property. Inside the getter method, return the _games property.
Below the team object, let’s try out our new .addPlayer() method to add a new player: Bugs Bunny, age 76.
Log the team‘s _players property to check that our new player was added.
The scorekeeper has some new information for us! Create a method for adding game results called addGame that takes three parameters: newOpponent, newTeamPoints, newOpponentPoints.
Inside the .addGame() method, create a game object by setting the three parameters to be the values for the object’s three properties: opponent, teamPoints, opponentPoints. Add the game object to the team‘s _games array.

Finally, below our team object, use the .addGame() method to add a record of a new game. Our team played against the 'Titans' where we scored 100 points and the opponent scored 98 points.

Log the team‘s _games property to check that our new game record was properly added.
*/

const team = {
    _players: [
      { firstName: 'XXXXX', lastName: 'Sanchez', age: 11 },
      { firstName: 'XXXX', lastName: 'Perez', age: 12 },
      { firstName: 'XXXX', lastName: 'Perez', age: 12 }
    ],
    _games: [
      { opponent: 'Broncos', teamPoints: 42, opponentPoints: 27 },
      { opponent: 'Broncos', teamPoints: 42, opponentPoints: 27 },
      { opponent: 'Broncos', teamPoints: 42, opponentPoints: 27 }
    ],
    get players() {
      return this._players;
    },
    get games() {
      return this._games;
    },
    addPlayer(firstName, lastName, age) {
      let player = {
        firstName: firstName,
        lastName: lastName,
        age: age
      };
      this._players.push(player);
    },
    addGame(opponent, teamPoints, opponentPoints) {
      let game = {
        opponent: opponent,
        teamPoints: teamPoints,
        opponentPoints: opponentPoints
      };
      this._games.push(game);
    }
  };
  
  // Add a new player using the addPlayer method
  team.addPlayer('Bugs', 'Bunny', 76);
  
  // Log the team's players
  console.log(team.players);
  
  // Add a new game using the addGame method
  team.addGame('Titans', 100, 98);
  
  // Log the team's games
  console.log(team.games);
  