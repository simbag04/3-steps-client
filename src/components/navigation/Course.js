/**
 * Course component
 * Renders page for a course, which includes links to all units in course
 */
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { ApiContext, UserContext } from "../../App";
import { Link } from "react-router-dom";

export const Course = () => {
  const { cname } = useParams();
  const apiLink = useContext(ApiContext);
  const { user } = useContext(UserContext);
  const [units, setUnits] = useState(null);
  const [title, setTitle] = useState(null);
  const nav = useNavigate();

  const backToCoursesHandler = () => {
    nav('/courses');
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
    }

    getUnits().catch(console.error)
  }, [cname, apiLink, user])

  return (
    <div className="flex vertical center large-gap text-center">
      <h1>{title}</h1>
      <div className="navigation unit">
        {/* Links to each unit with appropriate formatting */}
        {units &&
          units.map((unit) => {
            return <Link className="element unit-el" key={unit._id} to={`/${cname}/${unit.slug}`}><h2>{unit.name}</h2></Link>
          })}
      </div>
      <div>
        <button onClick={backToCoursesHandler}>Back to Courses</button>
      </div>
    </div>
  )
}