/**
 * Stars component
 * This renders the number of stars for the user for the topic
 * It also renders the info icon, with a popup on hover that shows more info about the stars
 */

import bronzeStar from '../svgs/bronze-star.svg'
import silverStar from '../svgs/silver-star.svg'
import goldStar from '../svgs/gold-star.svg'
import info from '../svgs/info-icon.svg'
import { useContext, useRef, useState } from 'react'
import '../styles/stars.css'
import check from '../svgs/check.svg'
import cross from '../svgs/cross.svg'
import { UserContext } from '../App'
import React from 'react'

interface StarsProps {
  star_goal: number, // user's goal for next star to get to
  star_2: string[], // array of dates of review for star_2
  star_3: string[], // array of dates of review for star_3
  streak: number, // streak to achieve to get the first star
  current_streak: number // user's best streak
}

export const Stars: React.FC<StarsProps> = ({ star_goal, star_2, star_3, streak, current_streak }) => {
  const { user } = useContext(UserContext);
  const [visible, setVisible] = useState(false); // visibility of popup
  const [position, setPosition] = useState({ x: 0, y: 0 }); // position of popup
  const infoRef = useRef(null);

  const handleMouseEnter = () => {
    if (infoRef.current) {
      setVisible(true);
      setPosition({ x: infoRef.current.offsetLeft, y: infoRef.current.offsetTop });
    }
  };

  const handleMouseLeave = () => {
    setVisible(false);
  };

  const infoStyle = {
    display: visible ? 'flex' : 'none',
    right: `${window.outerWidth - position.x - 100}px`, // Adjust the distance from the cursor
    top: `${position.y + 25}px`,
  };

  // vars to keep track of number of reviews left
  const num2ReviewsLeft = star_goal && star_2 ? star_goal > 2 ? 0 : Math.min((3 - star_2.length) + 1, 3) : 0;
  const num3ReviewsLeft = star_goal && star_3 ? star_goal > 3 ? 0 : Math.min((2 - star_3.length) + 1, 2) : 0;

  return (
    <>
      {user ?
        <>
          {/* Stars */}
          <span className="flex horizontal center progress">
            {star_goal > 1 ? <img className="star" src={bronzeStar} alt="star" /> : null}
            {star_goal === 1 ? <img className="opaque small-star" src={bronzeStar} alt="star" /> : null}
            {star_goal > 2 ? <img className="star" src={silverStar} alt="star" /> : null}
            {star_goal === 2 ? <img className="opaque small-star" src={silverStar} alt="star" /> : null}
            {star_goal > 3 ? <img className="star" src={goldStar} alt="star" /> : null}
            {star_goal === 3 ? <img className="opaque small-star" src={goldStar} alt="star" /> : null}
            <img className='info-svg' ref={infoRef} src={info} alt='info' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />
          </span>
          {/* Info Section */}
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