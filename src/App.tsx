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
import { createContext, useState, useEffect } from "react";
import { AllCourses } from "./components/navigation/AllCourses";
import { Course } from "./components/navigation/Course";
import { Unit } from "./components/navigation/Unit";
import { Login } from "./components/auth/Login";
import { Logout } from "./components/auth/Logout";
import { Register } from "./components/auth/Register";
import React from "react";
import { User } from "./@types/User";

export type UserContextType = {
  user: User,
  setUser: Function
}

export type HeaderHeightContextType = {
  height: number,
  setHeight: Function
}

export const ApiContext = createContext(null);
export const UserContext = createContext<UserContextType>(null);
export const HeaderHeightContext = createContext<HeaderHeightContextType>(null)

function App() {
  const [user, setUser] = useState(null);
  const [height, setHeight] = useState(null)
  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split(".")[1]))
    } catch (e) {
      return null;
    }
  }

  useEffect(() => {
    const verifyAuth = async () => {
      const token = localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("user"));
      if (token && user) {
        const decodedJwt = parseJwt(token);
        if (decodedJwt.exp * 1000 < Date.now()) {
          localStorage.setItem("token", null);
          localStorage.setItem("user", null);
        } else {
          setUser(user);
        }
      }
    }

    const attemptLogin = async () => {
      await verifyAuth();
    }

    attemptLogin().catch(console.error);
  }, [])

  return (
    <div>
      <ApiContext.Provider value={'https://three-steps-api.onrender.com'}>
        <UserContext.Provider value={{ user, setUser }}>
          <HeaderHeightContext.Provider value={{height, setHeight}}>
            <HashRouter>
              <Routes>
                <Route path="/" element={<Navbar />}>
                  <Route index element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/logout" element={<Logout />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/courses" element={<AllCourses />} />
                  <Route path="/:cname" element={<Course />} />
                  <Route path="/:cname/:uname" element={<Unit />} />
                  <Route path="/:cname/:uname/:name/learn"
                    element={<RenderLearnComponent />} />
                  <Route path="/:cname/:uname/:name/practice"
                    element={<RenderPracticeComponent />} />
                </Route>
              </Routes>
            </HashRouter>
          </HeaderHeightContext.Provider>
        </UserContext.Provider>
      </ApiContext.Provider>
    </div >
  );
}

// 'https://cyan-clear-chipmunk.cyclic.cloud'
export default App;
