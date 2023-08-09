import { HashRouter, Routes, Route } from "react-router-dom"
import { Home } from "./components/Home";
import { RenderComponent } from "./RenderComponent";

function App() {
  return (
    <HashRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/topic/:name" 
              element={<RenderComponent />} />
        </Routes>
    </HashRouter>
  );
}

export default App;
