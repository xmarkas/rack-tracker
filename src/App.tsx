import { StrictMode } from "react";
import { store } from "./store/store.ts";
import { Provider } from "tinybase/ui-react";
import { Inspector } from "tinybase/ui-react-inspector";
import { HeaderBar } from "./components/HeaderBar.tsx";
import { BottomNav } from "../src/components/BottomNav.tsx";
import { SLC } from "../src/components/SLC.tsx";

import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import { Home } from "./components/Home.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={[
        <HeaderBar key="topbar" />,
        <BottomNav key="bottombar" />,
        <Inspector key="tiny" />,
      ]}
    >
      <Route index element={<Home />} />
      <Route path="/slc" element={<SLC />} />
      {/* <Route path="register" element={<Register />} /> */}
    </Route>
  )
);

export const App = () => {
  return (
    <StrictMode>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </StrictMode>
  );
};
