import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import { ApiContext } from "../App";

export const Unit = () => {
  const { cname, uname } = useParams();
  const apiLink = useContext(ApiContext);
  const [topics, setTopics] = useState(null);
  const [title, setTitle] = useState(null);

  useEffect(() => {
    const getTopics = async () => {
      let currTopics = await fetch(`${apiLink}/course/${cname}/unit/${uname}/topics`);
      const json = await currTopics.json();
      const parsed = JSON.parse(json);

      setTitle(parsed.name);
      setTopics(parsed.topics);
    }

    getTopics().catch(console.error)
  }, [cname, uname, apiLink])

  return (
    <div>
      <h1>{title}</h1>
      {topics &&
        topics.map((topic) => {
          return (
            <div>
              {topic.name}
              <Link to={`/topic/${topic.slug}/learn`}>Learn</Link>
              <Link to={`/topic/${topic.slug}/practice`}>Practice</Link>
            </div>
          )
        })}
    </div>
  )

}