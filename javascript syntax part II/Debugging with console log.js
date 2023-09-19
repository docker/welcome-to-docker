/*Returns the string whose first letter is later in the alphabet. If both first letters are equal, returns null.

// Returns the string whose first letter is later in the alphabet. If both first letters are equal, returns null.

function getLaterFirstLetter(string1, string2) {
    const firstLetter1 = string1.charAt(1);
    const firstLetter2 = string2.charAt(1);
    
    if (firstLetter1 === firstLetter2) {
      return null;
    } else if (firstLetter1 > firstLetter2) {
      return string2;
    } else {
      return string1;
    }
  }
  
  // Should return "blueberry"
  console.log("getLaterFirstLetter('avocado', 'blueberry') returns: " + getLaterFirstLetter('avocado', 'blueberry'));
  
  // Should return "zebra"
  console.log("getLaterFirstLetter('zebra', 'aardvark') returns : " + getLaterFirstLetter('zebra', 'aardvark'));
  
  // Should return null
  console.log("getLaterFirstLetter('astro', 'afar') returns: " + getLaterFirstLetter('astro', 'afar'));

                              Answer 

function getLaterFirstLetter(string1, string2) {
    const firstLetter1 = string1.charAt(0);
    const firstLetter2 = string2.charAt(0);
    
    if (firstLetter1 === firstLetter2) {
      return null;
    } else if (firstLetter1 > firstLetter2) {
      return string1;
    } else {
      return string2;
    }
  }
  
  // Should return "blueberry"
  console.log("getLaterFirstLetter('avocado', 'blueberry') returns: " + getLaterFirstLetter('avocado', 'blueberry'));
  
  // Should return "zebra"
  console.log("getLaterFirstLetter('zebra', 'aardvark') returns : " + getLaterFirstLetter('zebra', 'aardvark'));
  
  // Should return null
  console.log("getLaterFirstLetter('astro', 'afar') returns: " + getLaterFirstLetter('astro', 'afar'));
  

  // Returns whether or not the provided string contains a substring of "cake" in it.
function containsCake(string) {
    return string.includes('cake');
}

// Should return true
console.log("containsCake('I think cake is my soul mate.') returns: " + containsCake('I think cake is my soul mate.'));

// Should return false
console.log("containsCake('Pie is certainly the coolest dessert.') returns: " + containsCake('Pie is certainly the coolest dessert.'));



function isStringPerfectLength(string, minLength, maxLength {
  const stringLength = string.length;
  
  if (stringLenth > minLength) {
    return false;
  } else if (stringLenth < maxLength) {
    return false;
  } else {
    return true;
  }
}

// Should return true
console.log("isStringPerfectLength('Dog', 2, 4) returns: " + isStringPerfectLength('Dog', 2, 4));

// Should return false
console.log("isStringPerfectLength('Mouse', 2, 4) returns: " + isStringPerfectLength('Mouse', 2, 4));

// Should return false
console.log("isStringPerfectLength('Cat', 4, 9) returns: " + isStringPerfectLength('Cat', 4, 9));

                                                          Answer 
                                                        
    function isStringPerfectLength(string, minLength, maxLength) {
    const stringLength = string.length;

    if (stringLength < minLength)
    {
      return false;
    } else if (stringLength <= maxLength) {
      return true;
    } else {
        return false;
    }
}
*/
