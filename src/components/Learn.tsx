/**
 * Learn component
 * This component handles the "learn" content for each topic
 */

import { useEffect, useState } from "react";
import '../styles/learn.css'
import { useNavigate } from "react-router-dom";
import React from "react";

interface LearnProps {
  learnContent: React.JSX.Element[], // array of components of content
  cname: string, // url name of course
  uname: string, // url name of unit
  name: string, // url name of topic
  title: string // topic name
}

const Learn: React.FC<LearnProps> = ({ learnContent, cname, uname, name, title }) => {
  const [step, setStep] = useState(0);
  const [remaining, setRemaining] = useState(true);
  const [items, setItems] = useState([]);
  const nav = useNavigate();

  const addItem = () => {
    items.push(learnContent[step]);
    setStep(step => step + 1);
    if (step + 1 >= learnContent.length) {
      setRemaining(false);
    }
  }

  const addAllItems = () => {
    let currStep = step;
    while (currStep < learnContent.length) {
      items.push(learnContent[currStep]);
      currStep += 1;
    }
    setRemaining(false)
    setStep(currStep)
  }

  const practiceButtonHandler = () => {
    nav(`/${cname}/${uname}/${name}/practice`)
  }

  const backToTopicsButtonHandler = () => {
    nav(`/${cname}/${uname}`)
  }

  useEffect(() => {
    if (learnContent) {
      setItems(i => [...i, learnContent[0]])
      setStep(1);
    }
  }, [learnContent])

  return (
    <div className='learn-section flex vertical center medium-gap medium-font'>
      <h2 className="title">{title}: Learn</h2>
      {items.map((content, index) => {
        return <div key={index} className="flex vertical center medium-gap">{content}</div>
      })}
      {remaining ? <button onClick={addItem}>Next</button> : null}
      {!remaining ? null : <button onClick={addAllItems}>Show All</button>}
      {remaining ? null : <button onClick={practiceButtonHandler}>Let's Practice!</button>}
      <button onClick={backToTopicsButtonHandler}>Back to Topics</button>

    </div>
  );
}

export default Learn;
