// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8];
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9];
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6];
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5];
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6];

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5];
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3];
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4];
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5];
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4];

// An array of all the arrays above
const batch = [valid1, valid2, valid3, valid4, valid5, invalid1, invalid2, invalid3, invalid4, invalid5];

// Add your functions below:

// Function to validate a credit card number
function validateCred(array) {
  let sum = 0;
  for (let i = array.length - 1; i >= 0; i--) {
    if (i % 2 === 1) {
      array[i] *= 2;
      if (array[i] > 9) {
        array[i] -= 9;
      }
    }
    sum += array[i];
  }
  return sum % 10 === 0;
}

// Function to find invalid credit cards
function findInvalidCards(nestedArray) {
  let invalidCards = [];
  nestedArray.forEach(function (array) {
    if (!validateCred(array)) {
      invalidCards.push(array);
    }
  });
  return invalidCards;
}

// Function to identify invalid card companies
function idInvalidCardCompanies(nestedArray) {
  let invalidCompanies = [];
  nestedArray.forEach(function (array) {
    switch (array[0]) {
      case 3:
        if (invalidCompanies.indexOf("Amex") === -1) {
          invalidCompanies.push("Amex");
        }
        break;
      case 4:
        if (invalidCompanies.indexOf("Visa") === -1) {
          invalidCompanies.push("Visa");
        }
        break;
      case 5:
        if (invalidCompanies.indexOf("Mastercard") === -1) {
          invalidCompanies.push("Mastercard");
        }
        break;
      case 6:
        if (invalidCompanies.indexOf("Discover") === -1) {
          invalidCompanies.push("Discover");
        }
        break;
      default:
        console.log("Company not found");
    }
  });
  return invalidCompanies;
}

// Find and log invalid credit cards
const invalidCreditCards = findInvalidCards(batch);
console.log("Invalid Credit Cards:", invalidCreditCards);

// Find and log companies with invalid credit cards
const invalidCompanies = idInvalidCardCompanies(invalidCreditCards);
console.log("Invalid Companies:", invalidCompanies);



