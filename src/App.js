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

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<Home />} />
          <Route path="/topic/:name/learn"
            element={<RenderLearnComponent />} />
          <Route path="/topic/:name/practice"
            element={<RenderPracticeComponent />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
