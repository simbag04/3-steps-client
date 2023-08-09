// Learn.js
import React from 'react';
import './styles.css'
import { learnContent } from './learn-content';
import { useEffect } from 'react';

const Learn = () => {
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
  }, []);


  return (
    <div className='learn-content'>
      {learnContent.map((content, index) => {
        return <div>{content}</div>
      })}
    </div>
  );
}

export default Learn;
