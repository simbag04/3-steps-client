/**
 * Home page for App
 * Contains links to topic pages
 */

import { AllCourses } from "./navigation/AllCourses"
import React from "react"

export const Home = () => {
  return (
    <div>
      <AllCourses></AllCourses>
    </div>
  )
}