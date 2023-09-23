const nerdamer = require("nerdamer/all.min")

/**
 * Shuffles an array
 * @param {array} array array to be shuffled
 * @returns shuffled array
 */
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // Generate a random index from 0 to i

    // Swap elements at i and j
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

/**
 * generates a random number
 * @param {number} min minimum value of random number
 * @param {number} max maximum value of random number
 * @returns random number in the range [min, max]
 */
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * generates a random number with exclusions
 * @param {number} min minimum value of random number
 * @param {number} max maximum value of random number
 * @param {array} exclusions numbers to be excluded from generation
 * @returns random number in the range [min, max] excluding exclusions
 */
function getRandomWithExclusions(min, max, exclusions) {
  const validValues = [];
  for (let i = min; i <= max; i++) {
    if (!exclusions.includes(i)) {
      validValues.push(i);
    }
  }

  if (validValues.length === 0) {
    return max;
  }

  const randomIndex = getRandomNumber(0, validValues.length - 1);
  return validValues[randomIndex];
}

/**
 * @param {Number} n number of values to generate
 * @param {boolean} increasing true if values should be increasing, false if decreasing
 * @returns array of n ordered numbers 
 */
function generateOrderedValues(n, increasing) {
  if (n <= 0) {
    return [];
  }

  const values = [Math.floor(Math.random() * 10) + 1]; // Initialize with a random value

  while (values.length < n) {
    // generate a value greater than the last one
    const nextDiff = getRandomNumber(1, 4) * (increasing ? 1 : -1);
    const nextValue = values[values.length - 1] + nextDiff; 
    values.push(nextValue);
  }

  return values;
}

/**
 * 
 * @param {String} polynomial string with a polynomial
 * @returns polynomial sorted in order of degree
 */
function sortPolynomialByDegree (polynomial) {
  // get coefficients with nerdamer
  const coefficients = nerdamer.coeffs(polynomial, 'x');
  let ans = "";
  const coeffs = [];
  coefficients.each(function(e) {
    coeffs.push(nerdamer(e).toString());
  })

  // build expression
  for (let i = coeffs.length - 1; i >= 0; i--) {
    if (coeffs[i] === "0") continue; // skip 0 terms

    // add "+" before positive coefficient terms
    if (i !== coeffs.length - 1) {
      if (Number(coeffs[i]) > 0) {
        ans += "+"
      } 
    }

    if (coeffs[i] !== "1") {
      ans += coeffs[i];
    }

    if (i > 1) {
      ans += `x^${i}`;
    } else if (i === 1) {
      ans += 'x';
    }
  }
  return ans;
}

/**
 * 
 * @param {String} xval xvalue from which to create factor
 * @returns String in form (x - p), where p is the xval
 */
function getStringFactorFromXval (xval) {
  const x = Number(xval);
  if (x < 0) {
    return `(x + ${Math.abs(x)})`
  } else if (x > 0) {
    return `(x - ${x})`
  } else {
    return `(x)`
  }
}


export {getRandomNumber, getRandomWithExclusions, generateOrderedValues, shuffleArray, sortPolynomialByDegree, getStringFactorFromXval }