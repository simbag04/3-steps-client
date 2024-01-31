/**
 * Component that dynamically imports relevant learn content from topic and renders
 */

import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Learn from './components/Learn';
import { ApiContext } from './App';

export const RenderLearnComponent = () => {
  const { cname, uname, name } = useParams();
  const [learnContent, setLearnContent] = useState(null);
  const [title, setTitle] = useState(null);
  const apiLink = useContext(ApiContext)

  useEffect(() => {
    import(`./topics/${uname}/${name}/learn-content.tsx`)
      .then(module => {
        setLearnContent(module.default)
      })
      .catch(error => {
        console.error(error)
      })  
  })

  useEffect(() => {
    const getTopicInfo = async () => {
      try {
        const apiRes = await fetch(`${apiLink}/topic/${name}/`, {
          method: "get",
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const json = await apiRes.json();
        setTitle(json.name)
      } catch (err) {
        console.log(err)
      }
    }

    getTopicInfo().catch(console.error)
  }, [apiLink, name])

  return (
    <Learn learnContent={learnContent} title={title} cname={cname} uname={uname} name={name} />
  );
}