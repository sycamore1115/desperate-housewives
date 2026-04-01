import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./Home";
import Episode from "./Episode";
import Part from "./Part";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/:eid" element={<Episode />}>
          {/* <Route path=":pid" element={<Part />} /> */}
        </Route>
        <Route path="/:eid/:pid" element={<Part />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
