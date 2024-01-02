import g02 from "../02-evaluating-limits-using-graphs/generate-question";
import g03 from "../03-estimating-limits-using-tables/generate-question";
import g04 from "../04-evaluating-limits-using-algebraic-properties/generate-question";
import g05 from "../05-evaluating-limits-using-direct-substitution/generate-question";
import g06 from "../06-evaluating-limits-using-algebraic-manipulation/generate-question";
import { getRandomNumber } from "../../../helpers/functions";
import { Question } from "../../../types/Question";

const generateRandomQuestion = (): Question => {
  const rand = getRandomNumber(1, 10);
  let q: Question = null;
  if (rand <= 1) {
    q = g02();
  } else if (rand <= 2) {
    q = g03();
  } else if (rand <= 4) {
    q = g04();
  } else if (rand <= 7) {
    q = g05();
  } else {
    q = g06();
  }

  return q;
}

export default generateRandomQuestion