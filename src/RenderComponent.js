import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Learn from './components/Learn';

export const RenderComponent = () => {
  const { name } = useParams();
  const [learnContent, setLearnContent]= useState(null);
  useEffect(() => {
    import(`./topics/${name}/learn-content.js`)
      .then(module => {
        setLearnContent(module.default)
      })
      .catch(error => {
        console.error(error)
      })
  })

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
    <Learn learnContent={learnContent} />
  );
}

/*
export const RenderComponent = () => {
  const { name } = useParams();
  const { learnContent, setLearnContent} = useState(null);

  // Use React.lazy to dynamically import the component
  const DynamicComponent = lazy(() => import(`./topics/${name}/Learn`));

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <DynamicComponent />
      </Suspense>
    </div>
  );
};

*/
