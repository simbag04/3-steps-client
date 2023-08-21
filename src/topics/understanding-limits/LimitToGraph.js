import { useCallback, useEffect, useState, useMemo, useLayoutEffect } from "react";
import { generateRandomPolynomialWithPoint, getRandomNumber } from "../../helpers/functions";
import LimitExampleGraph from "./LimitExampleGraph";

export const LimitToGraph = () => {
  const colors = useMemo(() => ['red', 'green', 'blue', 'orange', 'purple'], []);
  const [f, setF] = useState();
  const [xval, setXval] = useState(null);
  const [yval, setYval] = useState(null);
  const [shouldChangeColor, setShouldChangeColor] = useState(false);

  const generateGraphVars = useCallback(() => {
    const node = generateRandomPolynomialWithPoint(getRandomNumber(1, 4), 3, 8);
    const expression = (x) => node.evaluate({ x });
    setF(() => expression);
    setXval(5);
    setYval(7);
    setShouldChangeColor(true);
  }, [])

  useEffect(() => {
    generateGraphVars();
  }, [])

  // Changes function graph colors after it has rendered
  useLayoutEffect(() => {
    if (shouldChangeColor) {
      requestAnimationFrame(() => {
        const color = colors[getRandomNumber(0, colors.length - 1)];
        const functionStroke = document.querySelectorAll(".stroke.f");
        const functionFill = document.querySelectorAll(".fill.f");

        const allStroke = document.querySelectorAll(".stroke.x, .stroke.y");
        const allFill = document.querySelectorAll(".fill.x, .fill.y")

        const holeFill = document.querySelector(".hole.fill");

        functionStroke.forEach((el) => {
          el.style.stroke = color;
        });

        functionFill.forEach((el) => {
          el.style.fill = color;
        })

        allStroke.forEach((el) => {
          el.style.stroke = 'black';
        });

        allFill.forEach((el) => {
          el.style.fill = 'black';
        });

        if (holeFill !== null) {
          holeFill.style.fill = 'white';
        }

        setShouldChangeColor(false);
      });
    }
  }, [shouldChangeColor, colors]);

  return (
    <div>
      {f && <LimitExampleGraph f={f} xval={xval} y={yval}
        fColor={"f"} xColor={"x"} yColor={"y"} size={300} />}
    </div>
  )
}