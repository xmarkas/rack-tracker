import { StrictMode } from "react";
import { store } from "./store/store.ts";
import { Provider } from "tinybase/ui-react";
import { Inspector } from "tinybase/ui-react-inspector";
import { Box } from "@mui/material";
import { HeaderBar } from "./components/HeaderBar.tsx";
import { BottomNav } from "../src/components/BottomNav.tsx";
import { SLC } from "../src/components/SLC.tsx";
import { WorkProgressBar } from "../src/components/WorkProgressBar.tsx";


export const App = () => {
 

  return (
    <StrictMode>
      <Provider store={store}>
        <Box id="app">
          <HeaderBar />
          <WorkProgressBar />
          <SLC />
          <BottomNav />
          <Inspector />
        </Box>
      </Provider>
    </StrictMode>
  );
};
