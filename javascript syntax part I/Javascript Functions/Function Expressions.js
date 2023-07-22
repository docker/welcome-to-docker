const plantNeedsWater = function(day) {
    if (day === 'Wednesday') {
      return(true);
      } else {
        return(false); //Add an else statement after the if statement. & the else statement use the return keyword to return false.
      }
    };
    
     plantNeedsWater('Tuesday'); //Call the plantNeedsWater() and pass in 'Tuesday' as an argument.
    
    console.log(plantNeedsWater('Tuesday')); //Log plantNeedsWater('Tuesday') to the console. If it worked correctly, 
    //you should see false logged to the console.
    
    