import { ApiContext } from "../App"
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

export const AllCourses = () => {
  const apiLink = useContext(ApiContext);
  const [courses, setCourses] = useState(null);

  const getUrlName = (name) => {
    let lowercase = name.toLowerCase();
    let url_name = lowercase.split(" ");
    return url_name.join("-");
  }

  useEffect(() => {
    const getCourses = async () => {
      let currCourses = await fetch(`${apiLink}/courses`);
      const json = await currCourses.json();
      setCourses(JSON.parse(json))
    }

    getCourses().catch(console.error)
  }, [apiLink])

  return (
    <div className="flex vertical center large-gap">
      <h1>All Courses</h1>
      {courses &&
        courses.map((course) => {
          course.url_name = getUrlName(course.name);
          return (<div key={course._id}>
            <Link to={`/${course.url_name}`}>{course.name}</Link>
          </div>)
        })
      }
    </div>
  )
}