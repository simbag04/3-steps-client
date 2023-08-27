/**
 * Learn component
 * This component handles the "learn" content for each topic
 * Parameters:
 *  - learnContent: an array of components, where each component represents one "section" of content
 * This component allows 1 by 1 rendering of sections to help users process information in small chunks
 */

import { useEffect, useState } from "react";
import '../styles/learn.css'
import { useNavigate } from "react-router-dom";

const Learn = ({ learnContent, title, cname, uname, name }) => {
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
      {remaining ? null : <button onClick={practiceButtonHandler}>Let's Practice!</button>}
      <button onClick={backToTopicsButtonHandler}>Back to Topics</button>

    </div>
  );
}

export default Learn;
