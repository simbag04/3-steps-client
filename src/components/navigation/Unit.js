import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom"
import { ApiContext, UserContext } from "../../App";
import { Stars } from "../Stars";
import '../../styles/navigation.css'
import { format_review_date, review_date_passed } from "../../helpers/format-helpers";

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
            const rdp = review_date_passed(date);
            return (
              <div key={topic ? topic._id : i}
                className={"element topic-el center small-gap " + (date && rdp >= 0 ? "review" : "ok")}>
                <h2 className="text-center">{topic && topic.name}</h2>
                <div className="buttons">
                  <Link to={`/${cname}/${uname}/${topic && topic.slug}/learn`}>Learn</Link>
                  <Link to={`/${cname}/${uname}/${topic && topic.slug}/practice`}>
                    {rdp && rdp >= 0 ? "Review" : "Practice"}</Link>
                </div>
                {user && t && topic &&
                  <span className="flex horizontal center">
                    <strong>Progress: </strong><Stars star_goal={t.next_star_goal} star_2={t.star_2_review_dates} star_3={t.star_3_review_dates} streak={topic.streak_for_mastery} current_streak={t.best_streak} />
                  </span>}
                {date && t ? <span className="text-center review-info">
                  {rdp >= 9 && t.next_star_goal === 4 ?
                    <span><strong>Review in the next {14 - rdp} days to keep the gold star!</strong></span> : 
                    rdp >= 0 ?
                    <span>It's time to review! Streak: {t.next_review_date.streak}/2</span> 
                    : <span>Next review: <strong>{format_review_date(t.next_review_date.date)}</strong></span>}
                </span> : <span className="review-info invisible">none</span>}
              </div>
            )
          })
        }
      </div>
      <button onClick={backToUnitsButtonHandler}>Back to Units</button>
    </div>
  )

}