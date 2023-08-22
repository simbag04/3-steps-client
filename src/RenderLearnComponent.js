/**
 * Component that dynamically imports relevant learn content from topic and renders
 */

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Learn from './components/Learn';

export const RenderLearnComponent = () => {
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

  return (
    <Learn learnContent={learnContent} />
  );
}