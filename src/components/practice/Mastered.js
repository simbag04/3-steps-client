/**
 * Mastered component
 * Renders when user gets to star 1
 * Parameters: 
 *  - cname: url name of course
 *  - uname: url name of unit
 *  - name: url name of topic
 *  - title: topic name
 *  - setShowMastered: state for whether this page should be shown
 *  - stars: info about current stars for user for topic
 */
import { useNavigate } from "react-router-dom"
import { Stars } from "../Stars";
import { format_review_date } from "../../helpers/format-helpers";

export const Mastered = ({ cname, uname, name, title, setShowMastered, stars }) => {
  const nav = useNavigate();
  const star = stars.star_goal;

  // go back to practicing
  const practiceButton = () => {
    setShowMastered(false);
    nav(`/${cname}/${uname}/${name}/practice`)
  }

  const topics = () => nav(`/${cname}/${uname}`)

  return (
    <div className="flex vertical center large-gap">
      {/* title with stars */}
      <span className="flex horizontal center small-gap">
        <h1>{title}</h1>
        <Stars star_goal={stars.star_goal} star_2={stars.star_2} star_3={stars.star_3} streak={stars.streak} current_streak={stars.current_streak} />
      </span>
      <h2>Congratulations, you earned the {star === 2 ? "Bronze" : star === 3 ? "Silver" : "Gold"} star! </h2>
      <div>Review again on <strong>{format_review_date(stars.next_review_date)}</strong> to keep your knowledge fresh!</div>
      <button onClick={topics}>Back to Topics</button>
      <button onClick={practiceButton}>Continue Practicing</button>
    </div>
  )
}