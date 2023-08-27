import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { ApiContext } from "../App";
import { Link } from "react-router-dom";

export const Course = () => {
  const { cname } = useParams();
  const apiLink = useContext(ApiContext);
  const [units, setUnits] = useState(null);
  const [title, setTitle] = useState(null);

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
    <div>
      <h1>{title}</h1>
      {units && 
        units.map((unit) => {
          return <Link to={`/course/${cname}/unit/${unit.slug}`}>{unit.name}</Link>
        })}
    </div>
  )
}