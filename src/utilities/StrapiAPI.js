import { Auth } from "aws-amplify";
import awsExports from "../aws-exports";

export const StrapiAPI = async (
  strapikey,
  requestBody = null,
  method = "POST",
  org = "TENANT1",
  version = "0.01"
) => {
  const PROXY_API_URL = `https://z2wsmj5xgnzzlalectvhsd52k40vffll.lambda-url.us-east-1.on.aws?strapikey=${strapikey}&org=${org}&version=${version}`;
  // const API_KEY = awsExports.strapi_readonly_token;

  const requestOptions = {
    method: "POST",
  };
  console.log(requestOptions);
  if (method.toUpperCase() === "POST" || method.toUpperCase() === "PUT") {
    requestOptions.body =
      requestBody !== null ? JSON.stringify(requestBody) : {};
  }

  try {
    console.log(
      `MAKING THE ${method} CALL .. with STRAPI API to URL :${PROXY_API_URL}`
    );
    const response = await fetch(PROXY_API_URL, requestOptions);
    console.log("Response JSON 123 ");

    if (!response.ok) {
      throw new Error("Something went wrong during STRAPI POST call!");
    }

    let rsjson = await response.json();
    rsjson = rsjson.data.map((x) => {
      return <option value={x.attributes.code}>{x.attributes.display}</option>;
    });

    return rsjson;
  } catch (error) {
    console.log(error);
  }
};
