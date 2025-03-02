import { StrictMode, useState } from "react";
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
import { RackModal } from "./components/RackModal.tsx";

export const App = () => {
  // Check for new deployment
  setInterval(getDeploymentTime, 60000 * 60);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState<{[key: string] : any}>({});

  const handleOpenModal = (data = {}) => {
    setModalData(data);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <StrictMode>
      <Provider store={store}>
        <RackModal open={isModalOpen} handleClose={handleCloseModal} modalData={modalData}/>
        <Router>
          <Routes>
            <Route index={true} path="/" element={<Home />} />
            <Route
              path="/slc"
              element={[
                <HeaderBar key="slc1" />,
                <SLC key="slc2" />,
                <BottomNav key="slc3" />,
              ]}
            />
            <Route
              path="/rack"
              element={[
                <HeaderBar key="rack2" />,
                <RackTeam key="rack1" />,
                <BottomNav key="rack3" />,
              ]}
            />
            <Route
              path="/:building_ID/hall"
              element={[
                <HeaderBar key="hall2" />,
                <HallView key="hall1" openModal={handleOpenModal} />,
                <BottomNav key="hall3" />,
              ]}
            />
          </Routes>
        </Router>
      </Provider>
    </StrictMode>
  );
};
