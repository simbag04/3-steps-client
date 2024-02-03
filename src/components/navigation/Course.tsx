/**
 * Course component
 * Renders page for a course, which includes links to all units in course
 */
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { ApiContext, UserContext } from "../../App";
import { Link } from "react-router-dom";
import React from "react";
import { review_date_passed, format_review_date } from "../../helpers/format-helpers";
import bronzeStar from '../../svgs/bronze-star.svg'
import silverStar from '../../svgs/silver-star.svg'
import goldStar from '../../svgs/gold-star.svg'

export const Course = () => {
  const { cname } = useParams();
  const apiLink = useContext(ApiContext);
  const { user } = useContext(UserContext);
  const [units, setUnits] = useState(null);
  const [title, setTitle] = useState(null);
  const [unitsInfo, setUnitsInfo] = useState([])
  const nav = useNavigate();

  const backToCoursesHandler = () => {
    nav('/courses');
  }

  const countStars = (topicJson: any): any => {
    console.log(topicJson)
    let bronze = 0;
    let silver = 0;
    let gold = 0;
    let review = 0;
    let earliestReview = null
    let tempData = {}

    for (const topic of topicJson) {
      if (topic.next_star_goal >= 2) bronze += 1
      if (topic.next_star_goal >= 3) silver += 1
      if (topic.next_star_goal >= 4) gold += 1

      const rdp = review_date_passed(topic.next_review_date.date)
      const rd = new Date(topic.next_review_date.date)
      if (rdp >= 0) review += 1
      else {
        if (earliestReview === null) {
          earliestReview = new Date(topic.next_review_date.date)
        } else if (earliestReview.getTime() > rd.getTime()) {
          earliestReview = rd
        }
      }

    }
    tempData = { bronze, silver, gold, review, earliestReview, sum: topicJson.length }
    return tempData
  }

  // get units to render
  useEffect(() => {
    const getUnits = async () => {
      let currUnits = await fetch(`${apiLink}/course/${cname}/units`, {
        method: 'get',
        headers: {
          'Authorization': user ? ('bearer ' + localStorage.getItem("token")) : ''
        }
      });

      const json = await currUnits.json();
      setUnits(json.units.units);
      setTitle(json.units.name);

      if (user) {
        const arr = []
        for (const unit of json.units.units) {
          let topics = await fetch(`${apiLink}/course/${cname}/unit/${unit.slug}/topics`, {
            method: 'get',
            headers: {
              'Authorization': user ? ('bearer ' + localStorage.getItem("token")) : ''
            }
          });
          const topicJson = await topics.json();
          arr.push(countStars(topicJson.userTopics))
        }
        setUnitsInfo(arr)
      }
    }

    getUnits().catch(console.error)
  }, [cname, apiLink, user])

  return (
    <div className="flex vertical center large-gap text-center">
      <h1>{title}</h1>
      <div className="navigation unit">
        {/* Links to each unit with appropriate formatting */}
        {units &&
          units.map((unit, i) => {
            return (<Link className="element unit-el center small-gap" to={`/${cname}/${unit.slug}`}>
              <>
                <h2>{unit.name}</h2>
                {unitsInfo[i] ?
                  <>
                    <span className={`flex horizontal center medium-gap unit-stars`} key={i}>
                      <span className="flex horizontal center"><img className="star" src={bronzeStar} alt="star" />: {unitsInfo[i].bronze}/{unitsInfo[i].sum}</span>
                      <span className="flex horizontal center"><img className="star" src={silverStar} alt="star" />: {unitsInfo[i].silver}/{unitsInfo[i].sum}</span>
                      <span className="flex horizontal center"><img className="star" src={goldStar} alt="star" />: {unitsInfo[i].gold}/{unitsInfo[i].sum}</span>

                    </span>
                    <span className={`flex center unit-review`}>
                      {unitsInfo[i].review > 0 ?
                        <>
                          {unitsInfo[i].review} skills to review!
                        </> : unitsInfo[i].bronze > 0 ?
                        <>
                          No skills to review till {format_review_date(unitsInfo[i].earliestReview)}!
                        </> : null}
                    </span>
                  </>
                  : null}
              </>

            </Link>)
          })}
      </div>
      <div>
        <button onClick={backToCoursesHandler}>Back to Courses</button>
      </div>
    </div>
  )
}