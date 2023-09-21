import { generateOrderedValues, getRandomNumber } from "../../helpers/functions";
import { FunctionTable } from "../../components/content-components/tables/FunctionTable";
import Latex from "../../helpers/Latex";

function functionToTable() {

}

function tableToLimit() {
  const title = <></>

  // generate random data
  const data = [];
  const xVal = getRandomNumber(-9, 9); // xval at which to evaluate limit

  // 0: left, 1: right, 2: 2-sided
  const sign = getRandomNumber(0, 2);

  // get domain for table
  const startX = xVal - (getRandomNumber(0, 1) === 0 ? 3 : 0);
  const endX = xVal + ((getRandomNumber(0, 1) === 0 || xVal === startX) ? 3 : 0);

  const increasing = getRandomNumber(0, 1); // whether table values are increasing or decreasing
  const orderedValues = generateOrderedValues(endX - startX + 1, increasing); // values in table
  let ans = String(orderedValues[3]);

  // build table data
  for (let i = startX; i <= endX; i++) {
    const val = orderedValues[i - startX];

    // evaluate answer
    if (i === xVal && (i === startX || i === endX)) {
      if ((i === startX && sign === 0) || (i === endX && sign === 1) || sign === 2) {
        ans = "dne";
      }
    }

    if (i === xVal && xVal !== startX) {
      data.push({ x: i - 0.1, y: val - (increasing ? 0.1 : -0.1) })
      data.push({ x: i - 0.01, y: val - (increasing ? 0.01 : -0.01) })
      data.push({ x: i - 0.001, y: val - (increasing ? 0.001 : -0.001) })
    }

    data.push({ x: i, y: val });

    if (i === xVal && xVal !== endX) {
      data.push({ x: i + 0.001, y: val + (increasing ? 0.001 : -0.001) })
      data.push({ x: i + 0.01, y: val + (increasing ? 0.01 : -0.01) })
      data.push({ x: i + 0.1, y: val + (increasing ? 0.1 : -0.1) })
    }
  }

  const signText = sign === 0 ? `^{-}` : sign === 1 ? `^{+}` : ``;

  const nextToInput = <span>
    <Latex expression={`\\lim_{x \\to ${xVal + signText}}g(x)`} inline={true} /> =
  </span>

  const question = <div className="flex vertical center medium-gap">
    <div className="flex vertical center small-gap">
      <h2>Estimate the limit from the table.</h2>
      <div>Enter "dne" if the limit doesn't exist or cannot be evaluated from the table</div>
    </div>
    <FunctionTable xTitle={<Latex expression={`x`} />} yTitle={<Latex expression={`g(x)`} />} data={data} />
  </div>

  const type = 'frq';

  return { title, question, ans, type, nextToInput }
}

function generateRandomQuestion() {
  // determine type of question to generate
  const rand = 0
  let q = null;
  if (rand === 0) {
    q = tableToLimit();
  } else {
    q = functionToTable();
  }

  return q;
}

export default generateRandomQuestion