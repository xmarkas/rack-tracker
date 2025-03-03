import { StrictMode, useEffect, useState } from "react";
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
import { BarcodeReader } from "./components/BarcodeReader.tsx";
import { Box } from "@mui/material";

export const App = () => {
  // Check for new deployment
  setInterval(getDeploymentTime, 60000 * 60);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState<{ [key: string]: any }>({});
  const [showReader, setShowReader] = useState(false);
  const [barcode, setBarcode] = useState("");
  const screenRef = useRef(null);

  const handleOpenModal = (data = {}) => {
    console.log("modal", data);
    setModalData(data);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCloseScanner = (scanData: any) => {
    setShowReader(false);
    setBarcode(scanData.text);
  };

  useEffect(() => {}, [barcode]);

  enum NavItem {
    BACK,
    SLC,
    RACK,
    BARCODE,
  }

  return (
    <StrictMode>
      <Provider store={store}>
        <Box>
          <RackModal
            open={isModalOpen}
            handleClose={handleCloseModal}
            modalData={modalData}
          />
          {showReader && <BarcodeReader closeReader={handleCloseScanner} />}
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
                    showReader={setShowReader}
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
                    showReader={setShowReader}
                  />,
                ]}
              />
              <Route
                path="/:building_ID/hall"
                element={[
                  <HeaderBar key="hall2" />,
                  <HallView key="hall1" openModal={handleOpenModal} />,
                  <BottomNav
                    key="hall3"
                    selectedNavs={[NavItem.BACK, NavItem.BARCODE]}
                    showReader={setShowReader}
                  />,
                ]}
              />
            </Routes>
          </Router>
        </Box>
      </Provider>
    </StrictMode>
  );
};
