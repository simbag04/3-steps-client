/**
 * Component that dynamically imports relevant learn content from topic and renders
 */

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Learn from './components/Learn';

export const RenderLearnComponent = () => {
  const { cname, uname, name } = useParams();
  const [learnContent, setLearnContent]= useState(null);
  const [title, setTitle] = useState(null);
  useEffect(() => {
    import(`./topics/${name}/learn-content.js`)
      .then(module => {
        setLearnContent(module.default)
      })
      .catch(error => {
        console.error(error)
      })

    import(`./topics/${name}/constants.js`)
      .then(module => {
        setTitle(module.title)
      })
      .catch(error => {
        console.error(error)
      })
  })

  return (
    <Learn learnContent={learnContent} title={title} cname={cname} uname={uname} name={name} />
  );
}