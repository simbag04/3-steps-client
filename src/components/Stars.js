import bronzeStar from '../svgs/bronze-star.svg'
import silverStar from '../svgs/silver-star.svg'
import goldStar from '../svgs/gold-star.svg'
import info from '../svgs/info-icon.svg'
import { useContext, useState } from 'react'
import '../styles/stars.css'
import check from '../svgs/check.svg'
import cross from '../svgs/cross.svg'
import { UserContext } from '../App'

export const Stars = ({ star_goal, star_2, star_3, streak, current_streak }) => {
  const { user } = useContext(UserContext);
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseEnter = (e) => {
    setVisible(true);
    setPosition({ x: e.pageX, y: e.pageY });
  };

  const handleMouseLeave = () => {
    setVisible(false);
  };

  const infoStyle = {
    display: visible ? 'flex' : 'none',
    left: `${position.x + 10}px`, // Adjust the distance from the cursor
    top: `${position.y}px`,
  };

  const num2ReviewsLeft = star_goal && star_2 ? star_goal > 2 ? 0 : Math.min((3 - star_2.length) + 1, 3) : 0;
  const num3ReviewsLeft = star_goal && star_3 ? star_goal > 3 ? 0 : Math.min((2 - star_3.length) + 1, 2) : 0;

  return (
    <>
      {user ?
        <>
          <span className="flex horizontal center progress">
            {star_goal > 1 ? <img className="star" src={bronzeStar} alt="star" /> : null}
            {star_goal === 1 ? <img className="opaque small-star" src={bronzeStar} alt="star" /> : null}
            {star_goal > 2 ? <img className="star" src={silverStar} alt="star" /> : null}
            {star_goal === 2 ? <img className="opaque small-star" src={silverStar} alt="star" /> : null}
            {star_goal > 3 ? <img className="star" src={goldStar} alt="star" /> : null}
            {star_goal === 3 ? <img className="opaque small-star" src={goldStar} alt="star" /> : null}
            <img className='info-svg' src={info} alt='info' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />
          </span>
          <div style={infoStyle} className='stars-info flex vertical medium-gap'>
            <span>
              <img className="star" src={bronzeStar} alt='star' />
              {star_goal > 1 ? <img src={check} alt='check' /> : <img src={cross} alt='cross' />} Your streak: <strong>{current_streak}/{streak}</strong>
            </span>
            {star_2 && <span>
              <img className="star" src={silverStar} alt='star' />
              {star_goal > 2 ? <img src={check} alt='check' /> : <img src={cross} alt='cross' />} <strong>{num2ReviewsLeft}/3 </strong> reviews (at least 2 days apart) remaining
            </span>}
            {star_3 && <span>
              <img className="star" src={goldStar} alt='star' />
              {star_goal > 3 ? <img src={check} alt='check' /> : <img src={cross} alt='cross' />} <strong>{num3ReviewsLeft}/2 </strong> reviews (at least 7 days apart) remaining
            </span>}
            {star_goal > 3 ? <span className='text-center'>Review every 2 weeks to keep the gold star!</span> : null}
          </div>
        </> : null
      }
    </>
  )
}