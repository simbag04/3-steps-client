import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { ApiContext } from "../App";
import { Link } from "react-router-dom";

export const Course = () => {
  const { cname } = useParams();
  const apiLink = useContext(ApiContext);
  const [units, setUnits] = useState(null);
  const [title, setTitle] = useState(null);
  const nav = useNavigate();

  const backToCoursesHandler = () => {
    nav('/courses');
  }

  useEffect(() => {
    const getUnits = async () => {
      let currUnits = await fetch(`${apiLink}/course/${cname}/units`);
      const json = await currUnits.json();
      const parsed = JSON.parse(json);
      setUnits(parsed.units);
      setTitle(parsed.name);
    }

    getUnits().catch(console.error)
  }, [cname, apiLink])

  return (
    <div className="flex vertical center large-gap">
      <h1>{title}</h1>
      <div>
        {units &&
          units.map((unit) => {
            return <Link key={unit._id} to={`/${cname}/${unit.slug}`}>{unit.name}</Link>
          })}
      </div>
      <div>
        <button onClick={backToCoursesHandler}>Back to Courses</button>
      </div>
    </div>
  )
}