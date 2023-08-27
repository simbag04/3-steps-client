import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom"
import { ApiContext } from "../App";

export const Unit = () => {
  const { cname, uname } = useParams();
  const apiLink = useContext(ApiContext);
  const [topics, setTopics] = useState(null);
  const [title, setTitle] = useState(null);
  const nav = useNavigate();

  const backToUnitsButtonHandler = () => {
    nav(`/${cname}`)
  }

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
    <div className="flex vertical center large-gap">
      <h1>{title}</h1>
      {topics &&
        topics.map((topic) => {
          return (
            <div key={topic._id} className="flex vertical center small-gap">
              {topic.name}
              <Link to={`/${cname}/${uname}/${topic.slug}/learn`}>Learn</Link>
              <Link to={`/${cname}/${uname}/${topic.slug}/practice`}>Practice</Link>
            </div>
          )
        })}
        <button onClick={backToUnitsButtonHandler}>Back to Units</button>
    </div>
  )

}