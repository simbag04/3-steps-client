/**
 * Mastered component
 * Renders when user gets to star 1
 * Parameters: 
 *  - cname: url name of course
 *  - uname: url name of unit
 *  - name: url name of topic
 *  - title: topic name
 *  - setShowMastered: state for whether this page should be shown
 */
import { useNavigate } from "react-router-dom"

export const Mastered = ({ cname, uname, name, title, setShowMastered }) => {
  const nav = useNavigate();

  // go back to practicing
  const practiceButton = () => {
    setShowMastered(false);
    nav(`/${cname}/${uname}/${name}/practice`)
  }

  const topics = () => nav(`/${cname}/${uname}`)

  return (
    <div className="flex vertical center large-gap">
      <h1>{title}</h1>
      <h2>Congratulations, you mastered the skill!</h2>
      <button onClick={practiceButton}>Continue Practicing</button>
      <button onClick={topics}>Back to Topics</button>
    </div>
  )
}