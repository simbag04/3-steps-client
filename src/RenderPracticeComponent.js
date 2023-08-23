/**
 * Component that renders practice component with appropriate topic name
 */

import { useParams } from 'react-router-dom';
import { Practice } from "./components/Practice";
import { useState, useEffect } from 'react';

export const RenderPracticeComponent = () => {
  const { name } = useParams();
  const [title, setTitle] = useState(null);

  useEffect(() => {
    import(`./topics/${name}/title.js`)
      .then(module => {
        setTitle(module.default)
      })
      .catch(error => {
        console.error(error)
      })
  })

  return (
    <div>
      <Practice name={name} title={title} />
    </div>
  );
};