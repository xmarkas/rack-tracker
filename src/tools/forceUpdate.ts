import { store, values } from "../store/store";

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

export const getDeploymentTime = async (): Promise<{}> => {
  return fetch(vercelEndPoint, vApiConfig)
    .then((res) => res.json())
    .then((res) => {
      if (res) {
        if (res.crons.updatedAt > values.get("deployment")) {
          store.setValue("deployment", res.crons.updatedAt);
        }
      }
      return {success:true, updatedAt: res.crons.updatedAt};
    })
    .catch((err) => {
      console.log(err);
      return {success: false};
    });
};
