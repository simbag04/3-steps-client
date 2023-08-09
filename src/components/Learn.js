import { useEffect, useState } from "react";
import '../styles/learn.css'

const Learn = ({ learnContent }) => {
  const [step, setStep] = useState(0); 
  const [remaining, setRemaining] = useState(true);   
  const [items, setItems] = useState([]);

  const addItem = () => {
    items.push(learnContent[step]);
    setStep(step => step + 1);
    if (step + 1 >= learnContent.length) {
      setRemaining(false);
    }
  }

  useEffect(() => {
    if (learnContent) {
      setItems(i => [...i, learnContent[0]])
      setStep(1);
    }
  }, [learnContent])

  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.7/MathJax.js?config=TeX-MML-AM_CHTML';

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (window.MathJax) {
      window.MathJax.Hub.Queue(['Typeset', window.MathJax.Hub]);
    }
  });

  return (
    <div className='flex vertical center medium-gap medium-font'>
      {items.map((content, index) => {
        return <div className="flex vertical center medium-gap">{content}</div>
      })}
      {remaining ? <button onClick={addItem}>Add</button> : null }
    </div>
  );
}

export default Learn;
