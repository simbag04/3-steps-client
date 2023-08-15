import { HashRouter, Routes, Route } from "react-router-dom"
import { Home } from "./components/Home";
import { RenderLearnComponent } from "./RenderLearnComponent";
import { RenderPracticeComponent } from "./RenderPracticeComponent";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/topic/:name/learn"
          element={<RenderLearnComponent />} />
        <Route path="/topic/:name/practice"
          element={<RenderPracticeComponent />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
