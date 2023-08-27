/**
 * Main App Component
 * Handles routing
 * seperated learn/pratice to make component rendering easier
 */

import { HashRouter, Routes, Route } from "react-router-dom"
import { Home } from "./components/Home";
import { RenderLearnComponent } from "./RenderLearnComponent";
import { RenderPracticeComponent } from "./RenderPracticeComponent";
import './styles/main.css'
import { Navbar } from "./components/Navbar";
import { createContext } from "react";
import { AllCourses } from "./components/AllCourses";
import { Course } from "./components/Course";
import { Unit } from "./components/Unit";

export const ApiContext = createContext();

function App() {
  return (
    <div>
      <ApiContext.Provider value={'http://localhost:5000'}>
        <HashRouter>
          <Routes>
            <Route path="/" element={<Navbar />}>
              <Route index element={<Home />} />
              <Route path="/topic/:name/learn"
                element={<RenderLearnComponent />} />
              <Route path="/topic/:name/practice"
                element={<RenderPracticeComponent />} />
              <Route path="/courses" element={<AllCourses />} />
              <Route path="/course/:cname" element={<Course />} />
              <Route path="/course/:cname/unit/:uname" element={<Unit />} />
            </Route>
          </Routes>
        </HashRouter>
      </ApiContext.Provider>
    </div >
  );
}

export default App;
