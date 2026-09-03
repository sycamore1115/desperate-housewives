import { BrowserRouter, Route, Routes } from "react-router-dom";
import { BackTop } from "animal-island-ui";
import Homepage from "./Home";
import Episode from "./Episode";
import Part from "./Part";
import Search from "./Search";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/search" element={<Search />} />
        <Route path="/:eid" element={<Episode />} />
        <Route path="/:eid/:pid" element={<Part />} />
      </Routes>
      <BackTop visibilityHeight={320} />
    </BrowserRouter>
  );
}

export default App;
