import { StrictMode } from "react";
import { store } from "./store/store.ts";
import { Provider } from "tinybase/ui-react";
import { Inspector } from "tinybase/ui-react-inspector";
import { HeaderBar } from "./components/HeaderBar.tsx";
import { BottomNav } from "../src/components/BottomNav.tsx";
import { SLC } from "../src/components/SLC.tsx";
import { RackTeam } from "./components/RackTeam.tsx";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Home } from "./components/Home.tsx";

export const App = () => {
  return (
    <StrictMode>
      <Provider store={store}>
        <Router>
          <HeaderBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route index={true} path="/slc" element={<SLC />} />
            <Route path="/rack" element={<RackTeam />} />
          </Routes>
          <BottomNav />
          <Inspector />
        </Router>
      </Provider>
    </StrictMode>
  );
};
