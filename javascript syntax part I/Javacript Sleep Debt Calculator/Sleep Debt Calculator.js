            //const getActualSleepHours = () => {:
                        
//This line defines a function named getActualSleepHours using arrow function syntax.
//The function doesn't accept any parameters, indicated by the empty parentheses ().
//The function body is enclosed in curly braces {}.
       
               //let totalSleepHours = 0;:

//This line declares a variable named totalSleepHours and initializes it to 0.
//This variable will be used to keep track of the total sleep hours.

           //const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];:

//This line declares a constant variable named daysOfWeek.
//It is an array containing the names of the days of the week as strings.

                //for (let day of daysOfWeek) {:

//This line starts a for...of loop that iterates over each element in the daysOfWeek array.
//The loop assigns the value of each element to the variable day in each iteration.
const getActualSleepHours = () => {
    let totalSleepHours = 0;
    const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
 
               //Inside the loop, we have a switch statement to handle each day of the week:

//The switch statement evaluates the value of day and performs different actions based on its value.
//Each case represents a day of the week.
//For each day, it adds 8 (representing the actual number of hours slept on that day) to the totalSleepHours variable.

    for (let day of daysOfWeek) {
      switch (day) {
        case 'monday':
          totalSleepHours += 8;
          break;
        case 'tuesday':
          totalSleepHours += 8;
          break;
        case 'wednesday':
          totalSleepHours += 8;
          break;
        case 'thursday':
          totalSleepHours += 8;
          break;
        case 'friday':
          totalSleepHours += 8;
          break;
        case 'saturday':
          totalSleepHours += 8;
          break;
        case 'sunday':
          totalSleepHours += 8;
          break;
        default:
          break;
      }
    }
                        //return totalSleepHours;:

//Once the loop is finished, the function returns the value stored in the totalSleepHours variable.
    return totalSleepHours;
  };
  
  const getIdealSleepHours = () => {
    const idealHoursPerDay = 8; // Preferred ideal sleep hours per day
    const idealHoursPerWeek = idealHoursPerDay * 7; // Calculate ideal sleep hours per week
    return idealHoursPerWeek;
  };

                //const calculateSleepDebt = () => {:

//This line defines a function named calculateSleepDebt using arrow function syntax.
//The function doesn't accept any parameters, indicated by the empty parentheses ().
//The function body is enclosed in curly braces {}.

         //const actualSleepHours = getActualSleepHours();:

//This line declares a constant variable named actualSleepHours.
//It calls the getActualSleepHours function to get the actual sleep hours.
//The returned value from getActualSleepHours is assigned to the actualSleepHours variable.

         //const idealSleepHours = getIdealSleepHours();:

//This line declares a constant variable named idealSleepHours.
//It calls the getIdealSleepHours function to get the ideal sleep hours.
//The returned value from getIdealSleepHours is assigned to the idealSleepHours variable.

     //const sleepDebt = idealSleepHours - actualSleepHours;:

//This line declares a constant variable named sleepDebt.
//It calculates the sleep debt by subtracting the actual sleep hours from the ideal sleep hours.

  const calculateSleepDebt = () => {
    const actualSleepHours = getActualSleepHours();
    const idealSleepHours = getIdealSleepHours();

    const sleepDebt = idealSleepHours - actualSleepHours;

     //The following if...else statement checks the sleep debt and returns an appropriate message:

//If the actual sleep hours are greater than or equal to the ideal sleep hours, it returns the message "You got enough sleep! No sleep debt."
//If the actual sleep hours are less than the ideal sleep hours, it returns a message stating the sleep debt, including the number of hours of sleep debt.

    if (actualSleepHours >= idealSleepHours) {
      return "You got enough sleep! No sleep debt.";
    } else {
      return `You are sleep deprived! Your sleep debt is ${sleepDebt} hours.`;
    }
  }

  //Write a function, howOld(), that has two number parameters, age and year, and returns how old someone who is currently that age was
  // (or will be) during that year. Handle three different cases: 'You will be [calculated age] in the year [year passed in]'

  //If the year is before they were born, you should return a string in the following format: 
  //'The year [year passed in] was [calculated number of years] years before you were born'

  //If the year is in the past but not before the person was born, you should return a string in the following format:
  //'You were [calculated age] in the year [year passed in]'




  
  

  