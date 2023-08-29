/**
 * Practice component
 * This component handles the "practice" content for each topic
 * Parameters: 
 *  - name: name of the topic that is being practiced. This is used to dynamically import the corresponding Question component
 * 
 */

import React, { useEffect, useRef, useState, useCallback } from "react";
import '../styles/practice.css'
import { Stats } from "./Stats";

import '../topics/understanding-limits/styles.css'

export const Practice = ({ cname, uname, name, title }) => {
  const [goToNext, setGoToNext] = useState(false); // manages whether it's time to go to the next question
  const [newQ, setNewQ] = useState(false);
  const correctRef = useRef(null);
  const [qFunction, setQFunction] = useState(() => () => { });
  const [currQ, setCurrQ] = useState({});

  const selectedOptionRef = useRef(null);
  const selectedIndexRef = useRef(null);
  const optionRefs = useRef([]);

  useEffect(() => {
    import(`../topics/${name}/generate-question.js`)
      .then(module => {
        setQFunction(() => module.default);
      })
      .catch(error => {
        console.error(error);
      })
  })

  useEffect(() => {
    setCurrQ(qFunction());
    optionRefs.current.forEach((ref) => {
      console.log(ref);
      ref.current.classList.remove("correct", "incorrect", "selected")
    })
    selectedIndexRef.current = null;
    selectedOptionRef.current = null;
  }, [newQ, qFunction])

  const changeStyling = useCallback(() => {
    if (goToNext) {
      if (selectedOptionRef.current && selectedOptionRef.current.correct) {
        optionRefs.current.forEach((ref, i) => {
          if (i === selectedIndexRef.current) {
            ref.current.classList.add("correct");
          } else {
            ref.current.classList.remove("correct", "incorrect");
          }
        })
      } else {
        optionRefs.current.forEach((ref, i) => {
          if (i === selectedIndexRef.current) {
            ref.current.classList.add("incorrect");
          } else {
            ref.current.classList.remove("correct", "incorrect");
          }
        });
      }
    } else {
      optionRefs.current.forEach((ref, i) => {
        if (i === selectedIndexRef.current) {
          ref.current.classList.add('selected');
        } else {
          ref.current.className = "";
        }
      })
    }
  }, [goToNext])

  const handleClick = (option, index) => {
    if (!goToNext) {
      selectedOptionRef.current = option
      correctRef.current = option.correct
      selectedIndexRef.current = index
    }
    changeStyling();
  }

  useEffect(() => {
    changeStyling()
  }, [goToNext, changeStyling])

  return (
    <div className="flex vertical center medium-gap practice">
      <h1 className="title">{title}: Practice</h1>
      <div className="practice-section">
        {currQ && currQ.type === 'mc' &&
          <div className="question flex vertical center medium-gap">
            {currQ.title}
            {currQ.question}
            <div className="flex horizontal center medium-gap">
              {currQ.input && currQ.input.map((option, index) => {
                optionRefs.current[index] = optionRefs.current[index] || React.createRef();
                return (
                  <label key={index}
                    ref={optionRefs.current[index]}
                    onClick={() => handleClick(option, index)}>
                    {option.component}
                  </label>
                )
              })}
            </div>
          </div>
        }

        <Stats cname={cname} uname={uname} name={name} correctRef={correctRef}
          goToNext={goToNext} setGoToNext={setGoToNext} setNewQ={setNewQ}></Stats>
      </div>

    </div>
  );
}