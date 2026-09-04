import { BrowserRouter, Route, Routes } from "react-router-dom";
import { BackTop } from "animal-island-ui";
import Homepage from "./Home";
import Episode from "./Episode";
import Part from "./Part";
import Search from "./Search";
import SiteStats from "./SiteStats";

function App() {
  return (
    <BrowserRouter>
      <div className="app-layout">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/search" element={<Search />} />
          <Route path="/:eid" element={<Episode />} />
          <Route path="/:eid/:pid" element={<Part />} />
        </Routes>
        <SiteStats />
      </div>
      <BackTop visibilityHeight={480} />
    </BrowserRouter>
  );
}

export default App;
