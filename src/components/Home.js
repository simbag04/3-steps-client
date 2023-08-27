/**
 * Home page for App
 * Contains links to topic pages
 * I split links into learn/practice so it was easier to render different content
 */

import { AllCourses } from "./AllCourses"

export const Home = () => {
  return (
    <div>
      <AllCourses></AllCourses>
    </div>
  )
}