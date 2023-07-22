/*Let’s make a data structure to store the information about our team. Declare a const variable called team and set it to an empty object.
Our team has players and the games that they have played. Let’s represent both of these by adding two properties to your team object. Add a _players property and a _games property and initialize both to empty arrays.
Next, populate the empty_players array with three players. Each player should be an object containing three properties: firstName, lastName, and age. Put each player on a new line to prevent the line from getting too long.
Let’s do the same for our _games array. Populate the empty array with three games. Each game should be an object containing three properties: opponent, teamPoints, opponentPoints.
Create a getter method called players to retrieve the _players property. Inside the getter method, return the _players property.
For the scope of this project, we won’t need to create setter methods, because we don’t want anyone to change the data saved to the properties.
Create another getter method called games to retrieve the _games property. Inside the getter method, return the _games property.
Below the team object, let’s try out our new .addPlayer() method to add a new player: Bugs Bunny, age 76.
Log the team‘s _players property to check that our new player was added.
*/

const team = {};

team._players = ['firstName', 'lastName', 'age']; 
team._players.push(
    {firstName: 'XXXX', lastName: 'Bunny', age: 76}  
);

team._games = ['opponent', 'teamPoints', 'opponentPoints'];
team._games.push(
    {opponent: 'YYYYY', teamPoints: 76, opponentPoints: 76}
);


