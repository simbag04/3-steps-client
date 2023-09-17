/**
 * AllCourses component
 * Renders page with links to all available coursess
 */
import { ApiContext } from "../../App"
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

export const AllCourses = () => {
  const apiLink = useContext(ApiContext);
  const [courses, setCourses] = useState(null);

  // converts name to name that can be used in the url
  const getUrlName = (name) => {
    let lowercase = name.toLowerCase();
    let url_name = lowercase.split(" ");
    return url_name.join("-");
  }

  // get courses
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
      <div className="navigation unit">
        {/* Links to all available coures */}
        {courses &&
          courses.map((course) => {
            course.url_name = getUrlName(course.name);
            return (<div key={course._id}>
              <Link className="element unit-el" to={`/${course.url_name}`}><h2>{course.name}</h2></Link>
            </div>)
          })
        }
      </div>
    </div>
  )
}