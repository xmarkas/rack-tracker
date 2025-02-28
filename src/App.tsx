import { StrictMode, useEffect } from "react";
import { store } from "./store/store.ts";
import { Provider } from "tinybase/ui-react";
import { HeaderBar } from "./components/HeaderBar.tsx";
import { BottomNav } from "../src/components/BottomNav.tsx";
import { SLC } from "../src/components/SLC.tsx";
import { RackTeam } from "./components/RackTeam.tsx";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Home } from "./components/Home.tsx";
import { values as storeValues } from "./store/store";

const vercelToken: string = "OoEfoWGJ54rMDYukYEySaTJL";
const vercelEndPoint: string =
  "https://api.vercel.com/v9/projects/rack-tracker";
// const vercelProjectId: string = 'prj_Uf1QZe4p3eBnVv70ubdabWce81Rp';
const vApiConfig = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${vercelToken}`,
  },
};

export const App = () => {
  storeValues.add("deployment", 0);
  let deployment: number = storeValues.get("deployment") || 0;

  const getDeploymentTime = () => {
    fetch(vercelEndPoint, vApiConfig)
      .then((res) => res.json())
      .then((res) => {
        if (res) {
          console.log("deployment---> ", res.crons.updatedAt);
          if (res.crons.updatedAt > deployment) {
            alert("new deployment")
            storeValues.add("deployment", res.crons.updatedAt);
          }
          
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  getDeploymentTime();
  setInterval(getDeploymentTime, 30000) //60000 * 60);

  return (
    <StrictMode>
      <Provider store={store}>
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
          </Routes>
        </Router>
      </Provider>
    </StrictMode>
  );
};
