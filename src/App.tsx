import { StrictMode, useEffect, useRef, useState } from "react";
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
//import { BarcodeReader } from "./components/BarcodeReader.tsx";
import { BarcodeScanner } from "./components/BarcodeReaderAlt.tsx";
import { Box } from "@mui/material";
import {Result} from "@zxing/library"

export const App = () => {
  // Check for new deployment
  setInterval(getDeploymentTime, 60000 * 60);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState<{ [key: string]: any }>({});
  const [_showReader, setShowReader] = useState(false);
  const [barcode, setBarcode] = useState("");
  const [error, setError] = useState(null);
  const screenRef = useRef(null);
  

  const handleOpenModal = (data = {}) => {
    console.log("modal", data);
    setModalData(data);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setBarcode("");
  };

  const barcodeFiresModal = (result : Result) => {
      setBarcode(result.getText());
      setIsModalOpen(true);
  }

  const onBarcodeError = (err : any) => {
    setError(err);
    setIsModalOpen(true);
  }

  // const handleCloseScanner = (scanData: any) => {
  //   setShowReader(false);
  //   setBarcode(scanData.text);
  // };

  useEffect(() => {
    if (barcode !== "") setIsModalOpen(true)
  }, [barcode]);

  enum NavItem {
    BACK,
    SLC,
    RACK,
    BARCODE,
  }

  return (
    <StrictMode>
      <Provider store={store}>
        <Box ref={screenRef}>
          <RackModal
            open={isModalOpen}
            handleClose={handleCloseModal}
            modalData={modalData}
            barcode={barcode}
            error={error}
          />
          {/* {showReader ?  <BarcodeReader closeReader={handleCloseScanner} />} */}
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
                    setBarocde={setBarcode}
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
                    setBarocde={setBarcode}
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
                    setBarocde={setBarcode}
                  />,
                ]}
              />
              <Route
                path="/beta"
                element={[
                  
                  <BarcodeScanner key="beta2" onResult={barcodeFiresModal} onError={onBarcodeError} barcode={barcode}/>,
                  <BottomNav
                    key="beta1"
                    selectedNavs={[NavItem.BACK]}
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
