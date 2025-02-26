import { StrictMode } from "react";
import { store } from "./store/store.ts";
import { Provider } from "tinybase/ui-react";
// import {
//   SortedTableInHtmlTable,
//   ValuesInHtmlTable,
//   EditableCellView,
// } from "tinybase/ui-react-dom";
import { Inspector } from "tinybase/ui-react-inspector";
// import { Buttons } from "./Buttons";
import { Box } from "@mui/material";
// import { AddRack } from "../src/components/AddRack.tsx";

import { HeaderBar } from "./components/HeaderBar.tsx";
import { BottomNav } from "../src/components/BottomNav.tsx";
import { SLC } from "../src/components/SLC.tsx";
import {WorkProgressBar} from "../src/components/WorkProgressBar.tsx"

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

{
  /* <div>
            <h2>Values</h2>
            <ValuesInHtmlTable />
          </div>
          <div>
            <h2>Pets Table</h2>
            <SortedTableInHtmlTable
              tableId="pets"
              cellId="name"
              limit={8}
              sortOnClick={true}
              className="sortedTable"
              paginator={true}
            />
          </div> */
}
