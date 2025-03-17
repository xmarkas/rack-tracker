import { StrictMode } from "react";
import { store } from "./store/store.ts";
import { Provider } from "tinybase/ui-react";
import { HeaderBar } from "./components/HeaderBar.tsx";
import { BottomNav } from "../src/components/BottomNav.tsx";
import { SLC } from "../src/components/SLC.tsx";
import { RackTeam } from "./components/RackTeam.tsx";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Home } from "./components/Home.tsx";
import { HallView } from "./components/HallView.tsx";
import { getDeploymentTime } from "./tools/forceUpdate.ts";
import { Box } from "@mui/material";
import { Inspector } from "tinybase/ui-react-inspector";
import { ViewList } from "./components/ViewList.tsx";
import { BCR } from "./components/BCR.tsx";
import { BCresult } from "./components/BCresult.tsx";
import { ThisRack } from "./components/ThisRack.tsx";

export const App = () => {
  // Check for new deployment
  setInterval(getDeploymentTime, 60000 * 60);

  enum NavItem {
    BACK,
    SLC,
    RACK,
    BARCODE,
    TORCH,
  }

  return (
    <StrictMode>
      <Provider store={store}>
        <Box sx={{overflow: "hidden"}}>
          <Router>
            <Routes>
              <Route index={true} path="/" element={<Home />} />
              <Route
                path="/slc"
                element={[
                  <HeaderBar key="slc1" />,
                  <SLC key="slc2" />,
                  <BottomNav
                    key="slc3"
                    selectedNavs={[NavItem.RACK, NavItem.BARCODE]}
                  />,
                ]}
              />
              <Route
                path="/rack"
                element={[
                  <HeaderBar key="rack2" />,
                  <RackTeam key="rack1" />,
                  <BottomNav
                    key="rack3"
                    selectedNavs={[NavItem.SLC, NavItem.BARCODE]}
                  />,
                ]}
              />
              <Route
                path="/:building_ID/hall"
                element={[
                  <HeaderBar key="hall2" />,
                  <HallView key="hall1" />,
                  <BottomNav
                    key="hall3"
                    selectedNavs={[NavItem.BACK, NavItem.BARCODE]}
                  />,
                ]}
              />
              <Route
                path="/scan"
                element={[
                  <BCR key="s2" />,
                  <BottomNav
                    key="s3"
                    selectedNavs={[NavItem.BACK]}
                    bgColor="transparent"
                  />,
                ]}
              />
              <Route
                path="/:barcode/:bctype/barcode"
                element={[
                  <HeaderBar key="b1" />,
                  <BCresult key="b2"/>,
                  <BottomNav
                    key="b3"
                    selectedNavs={[NavItem.BACK]}
                  />,
                ]}
              />
              <Route
                path="/:view/viewlist"
                element={[
                  <HeaderBar key="v3" />,
                  <ViewList key="v1" />,
                  <BottomNav
                    key="v2"
                    selectedNavs={[NavItem.BACK]}
                    
                  />,
                ]}
              />
              <Route
                path="/:rowId/:moveType/thisrack"
                element={[
                  <HeaderBar key="t3" />,
                  <ThisRack key="t1" />,
                  <BottomNav
                    key="t2"
                    selectedNavs={[NavItem.BACK]}
                    
                  />,
                ]}
              />
            </Routes>
          </Router>
        </Box>
        <Inspector />
      </Provider>
    </StrictMode>
  );
};
