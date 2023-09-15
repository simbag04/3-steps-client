import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom"
import { ApiContext, UserContext } from "../App";
import { Stars } from "./Stars";
import '../styles/navigation.css'
import { format_review_date, review_date_passed } from "../helpers/format-helpers";

export const Unit = () => {
  const { cname, uname } = useParams();
  const apiLink = useContext(ApiContext);
  const { user } = useContext(UserContext)
  const [topics, setTopics] = useState(null);
  const [title, setTitle] = useState(null);
  const nav = useNavigate();

  const backToUnitsButtonHandler = () => {
    nav(`/${cname}`)
  }

  useEffect(() => {
    const getTopics = async () => {
      let currTopics = await fetch(`${apiLink}/course/${cname}/unit/${uname}/topics`, {
        method: 'get',
        headers: {
          'Authorization': user ? ('bearer ' + localStorage.getItem("token")) : ''
        }
      });
      const json = await currTopics.json();
      setTitle(json.topics.name);

      if (user) {
        setTopics(json.userTopics);
      } else {
        setTopics(json.topics.topics);
      }
    }
    getTopics().catch(console.error)
  }, [cname, uname, apiLink, user])

  return (
    <div className="flex vertical center large-gap">
      <h1>{title}</h1>
      <div className="navigation topic">
        {topics &&
          topics.map((t, i) => {
            const topic = user ? t.topic_id : t;
            const date = user && t && t.next_review_date ? t.next_review_date.date : null;
            return (
              <div key={topic ? topic._id : i}
                className={"element topic-el center small-gap " + (review_date_passed(date) ? "review" : "ok")}>
                <h2 className="text-center">{topic && topic.name}</h2>
                <Link to={`/${cname}/${uname}/${topic && topic.slug}/learn`}>Learn</Link>
                <Link to={`/${cname}/${uname}/${topic && topic.slug}/practice`}>
                  {review_date_passed(date) ? "Review" : "Practice"}</Link>
                {user && t && <Stars star_goal={t.next_star_goal} />}
                {date && <span>
                  {review_date_passed(date) ?
                    <span>It's time to review! Streak: {t.next_review_date.streak}/2</span> :
                    <span>Next review: {format_review_date(t.next_review_date.date)}</span>}
                </span>}
              </div>
            )
          })
        }
      </div>
      <button onClick={backToUnitsButtonHandler}>Back to Units</button>
    </div>
  )

}