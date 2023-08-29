/**
 * Component that renders practice component with appropriate topic name
 */

import { useParams } from 'react-router-dom';
import { Practice } from "./components/Practice";
import { useState, useEffect } from 'react';

export const RenderPracticeComponent = () => {
  const { cname, uname, name } = useParams();
  const [title, setTitle] = useState(null);
  const [numProblems, setNumProblems] = useState(0);

  useEffect(() => {
    import(`./topics/${name}/constants.js`)
      .then(module => {
        setTitle(module.title)
        setNumProblems(module.streak)
      })
      .catch(error => {
        console.error(error)
      })
  })

  return (
    <div>
      <Practice cname={cname} uname={uname} name={name} title={title} numProblems={numProblems}/>
    </div>
  );
};