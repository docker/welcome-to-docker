//Write a function, howOld(), that has two number parameters, age and year, and returns how old someone who is currently that age was (or will be) during that year. Handle three different cases:
//If the year is in the future, you should return a string in the following format:'You will be [calculated age] in the year [year passed in]'

//If the year is before they were born, you should return a string in the following format: 'The year [year passed in] was [calculated number of years] years before you were born'

//If the year is in the past but not before the person was born, you should return a string in the following format: 'You were [calculated age] in the year [year passed in]'

//If the year is the same as the person's birth year, return a string in the following format: 'You were born this very year!'
//If the year is in the future, you should return a string in the following format: 'You will be [calculated age] in the year [year passed in]'

function howOld(age, year) {
    let dateToday = new Date();
    let thisYear = dateToday.getFullYear();
//it is totally of if your function used the current year directly 
    const yearDifference = year - thisYear;
    const newAge = age + yearDifference;
    if (newAge > age) {
        return `You will be ${newAge} in the year ${year}`;
    } else if (newAge < 0) {
        return `The year ${year} was ${-newAge} years before you were born`;
    } else {
        return `You were ${newAge} in the year ${year}`;
    }
}

/*Certainly! Let's break down the code step by step:

1. `let dateToday = new Date();`
   - This line creates a new `Date` object called `dateToday`, representing 
   the current date and time.

2. `let thisYear = dateToday.getFullYear();`
   - This line extracts the current year from the `dateToday` object using 
   the `getFullYear()` method and assigns it to the variable `thisYear`.

3. `const yearDifference = year - thisYear;`
   - This line calculates the difference between the `year` parameter 
   passed to the function and the current year (`thisYear`) and stores it in the `yearDifference` variable. This difference represents how many years in the future or past the `year` parameter is compared to the current year.

4. `const newAge = age + yearDifference;`
   - This line adds the `yearDifference` to the `age` parameter, resulting in 
   the `newAge` variable representing the person's age in the year specified by 
   the `year` parameter.

5. `if (newAge > age) { ... } else if (newAge < 0) { ... } else { ... }`
   - These conditional statements check different scenarios based on the calculated 
   `newAge`:

   - If `newAge` is greater than `age`, it means the specified year is in the future, 
   so it returns a string stating the person's age in that year.

   - If `newAge` is less than 0, it means the specified year is before the person
    was born, so it returns a string stating the number of years prior to their birth.
    
   - If neither of the above conditions is true, it means the specified year is within
    the person's lifetime, so it returns a string stating their age in that year.

6. The corresponding strings are returned based on the condition satisfied.

In summary, this function calculates a person's age in a given year compared to their 
current age, considering whether the year is in the future, in the past, or 
within their lifetime.*/
