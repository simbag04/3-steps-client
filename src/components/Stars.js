import bronzeStar from '../helpers/bronze-star.svg'
import silverStar from '../helpers/silver-star.svg'
import goldStar from '../helpers/gold-star.svg'

export const Stars = ({ star_goal }) => {
  return (
    <span className="flex horizontal center">
      {star_goal > 1 ? <img src={bronzeStar} alt="star" /> : null}
      {star_goal > 2 ? <img src={silverStar} alt="star" /> : null}
      {star_goal > 3 ? <img src={goldStar} alt="star" /> : null}
    </span>
  )
}