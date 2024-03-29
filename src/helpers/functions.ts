import * as math from "mathjs"
import { FunctionValue } from "../@types/FunctionValue";
import { TableValue } from "../@types/TableValue";
const nerdamer = require("nerdamer/all.min")

/**
 * Shuffles an array
 * @param {array} array array to be shuffled
 * @returns shuffled array
 */
const shuffleArray = (array: Array<any>): Array<any> => {
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
const getRandomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * generates a random number with exclusions
 * @param {number} min minimum value of random number
 * @param {number} max maximum value of random number
 * @param {array} exclusions numbers to be excluded from generation
 * @returns random number in the range [min, max] excluding exclusions
 */
const getRandomWithExclusions =
  (min: number, max: number, exclusions: Array<number>): number => {
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
const generateOrderedValues =
  (n: number, increasing: boolean, extreme: number = 10,
    increment: number = 4): Array<number> => {
    if (n <= 0) {
      return [];
    }

    const values = [Math.floor(Math.random() * extreme) + 1]; // Initialize with a random value

    while (values.length < n) {
      // generate a value greater than the last one
      const nextDiff = getRandomNumber(1, increment) * (increasing ? 1 : -1);
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
const sortPolynomialByDegree = (polynomial: string): string => {
  // get coefficients with nerdamer
  const coefficients = nerdamer.coeffs(polynomial, 'x');
  let ans = "";
  const coeffs = [];
  coefficients.each(function (e) {
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

    if (coeffs[i] !== "1" || (coeffs[i] === "1" && i === 0)) {
      ans += coeffs[i] === "-1" ? i === 0 ? "-1" : "-" : coeffs[i];
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
 * Returns polynomial expression given coefficients of polynomial
 * @param coeffs to use in building polynomial
 * @returns expression
 */
const buildPolynomialFromCoeffs = (coeffs: any[]): string => {
  for (let i = 0; i < coeffs.length; i++) {
    coeffs[i] = String(coeffs[i])
  }

  let ans = ''
  for (let i = coeffs.length - 1; i >= 0; i--) {
    if (coeffs[i] === "0") continue; // skip 0 terms

    // add "+" before positive coefficient terms
    if (i !== coeffs.length - 1) {
      if (Number.isNaN(Number(coeffs[i])) || Number(coeffs[i]) > 0) {
        ans += "+"
      }
    }

    if (coeffs[i] !== "1" || (coeffs[i] === "1" && i === 0)) {
      ans += coeffs[i] === "-1" ? i === 0 ? "-1" : "-" : coeffs[i];
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
 * Extracts coefficients of polynomial in increasing order of degree
 * @param polynomial string with polynomial expression
 * @returns Coefficients of polynomial in increasing order of degree
 */
const getCoeffsOfPolynomial = (polynomial: string): number[] => {
  const coefficients = nerdamer.coeffs(polynomial, 'x');
  const coeffs = [];
  coefficients.each(function (e) {
    coeffs.push(Number(nerdamer(e).toString()));
  })

  return coeffs
}

/**
 * Finds roots of given polynomial expression (works only with polynomials of degree 2)
 * @param polynomial string wth polynomial expression to find roots
 * @returns vector of roots of polynomial as decimals
 * if there is only 1 root, it will return a vector of length 2 with both values the same root
 */
const getRootsOfPolynomial = (polynomial: string): string[] => {
  const roots = nerdamer(`roots(${polynomial})`)
  const elements = roots.symbol.elements
  const r1 = convertToDecimal(elements[0].toString())
  const r2 = elements[1] === undefined ? r1 : convertToDecimal(elements[1].toString())
  return [r1, r2]
}

/**
 * converts provided number (potentially a fraction) to a decimal
 * @param number string of number to convert to decimal
 * @returns decimal equivalent of number
 */
const convertToDecimal = (number: string): string => {
  return nerdamer(number).text(`decimals`)
}

/**
 * 
 * @param {String} xval xvalue from which to create factor
 * @returns String in form (x - p), where p is the xval
 */
const getStringFactorFromXval = (xval: number): string => {
  if (xval < 0) {
    return `(x + ${Math.abs(xval)})`
  } else if (xval > 0) {
    return `(x - ${xval})`
  } else {
    return `(x)`
  }
}

/**
 * @param {Array} array where each element is in the form {f: String, value: Number}
 * @returns object with keys as all the f Strings, values as the value of that String
 */
const convertArrayToObject = (array: Array<FunctionValue>): FunctionValue => {
  const obj = {};
  for (let i = 0; i < array.length; i++) {
    const currentObj = array[i];
    if (currentObj.hasOwnProperty('f')) {
      const key = currentObj['f'];
      obj[key] = currentObj['value'];
    }
  }
  return obj as FunctionValue;
}

/**
 * @param {Number} a 
 * @param {Number} b 
 * @returns least common multiple of a and b
 */
const findLCM = (a: number, b: number): number => {
  // Calculate the greatest common divisor (GCD) using Euclidean algorithm
  function findGCD(x, y) {
    if (y === 0) {
      return x;
    }
    return findGCD(y, x % y);
  }

  // LCM is the product of the two numbers divided by their GCD
  return (a * b) / findGCD(a, b);
}

/**
 * @param {Number} xVal at which table will "zoom in"
 * @param {Array} values to use as yvalues in table
 * @param {Number} start of xs in table
 * @param {Number} end of xs in table
 * @returns data array containing x, y pairs for points that could be used in a limit table
 */
const generateLimitTableData =
  (xVal: number, values: Array<number>, start: number, end: number): { data: TableValue[] } => {
    const increasing = values[1] - values[0] >= 0;
    const data: TableValue[] = [];
    // build table data
    for (let i = start; i <= end; i++) {
      const val = values[i - start];

      // zooming in to the left of xVal
      if (i === xVal && xVal !== start) {
        data.push({ x: i - 0.1, y: val - (increasing ? 0.1 : -0.1) })
        data.push({ x: i - 0.01, y: val - (increasing ? 0.01 : -0.01) })
        data.push({ x: i - 0.001, y: val - (increasing ? 0.001 : -0.001) })
      }

      data.push({ x: i, y: val });  // other xvalues

      // zooming in to the right of xval
      if (i === xVal && xVal !== end) {
        data.push({ x: i + 0.001, y: val + (increasing ? 0.001 : -0.001) })
        data.push({ x: i + 0.01, y: val + (increasing ? 0.01 : -0.01) })
        data.push({ x: i + 0.1, y: val + (increasing ? 0.1 : -0.1) })
      }
    }

    return { data }
  }

/**
 * @param {String} polynomial to format
 * @returns formatted latex polynomial formatted with mathjs
 */
const formatPolynomialToLatex = (polynomial: string): string => {
  const str: String = math.simplifyCore(polynomial).toTex()
  return str.replaceAll('\\cdot', '').replaceAll('~', '');
}

/**
 * @param {String} expression to format
 * @returns formatted latex polynomial formatted with nerdamer
 */
const nerdamerFormatToLatex = (expression: string): string => {
  return nerdamer(expression).toTeX().replaceAll('\\cdot', '').replaceAll('~', '')
}

export { getRandomNumber, getRandomWithExclusions, generateOrderedValues, shuffleArray, sortPolynomialByDegree, getStringFactorFromXval, convertArrayToObject, findLCM, generateLimitTableData, formatPolynomialToLatex, nerdamerFormatToLatex, getCoeffsOfPolynomial, getRootsOfPolynomial, convertToDecimal, buildPolynomialFromCoeffs }