/**
 * Component that renders practice component with appropriate topic name
 */

import { useParams } from 'react-router-dom';
import { Practice } from "./components/practice/Practice";
import { useState, useEffect } from 'react';
import { useContext } from 'react';
import { ApiContext } from './App';
import React from 'react';

export const RenderPracticeComponent = () => {
  const { cname, uname, name } = useParams();
  const [title, setTitle] = useState(null);
  const [numProblems, setNumProblems] = useState(0);
  const apiLink = useContext(ApiContext);

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
        setNumProblems(Number(json.streak_for_mastery))
      } catch (err) {
        console.log(err)
      }
    }

    getTopicInfo().catch(console.error)
  }, [apiLink, name])

  return (
    <div>
      <Practice cname={cname} uname={uname} name={name} title={title} numProblems={numProblems}/>
    </div>
  );
};