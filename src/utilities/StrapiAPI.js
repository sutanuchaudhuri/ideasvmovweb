import { Auth } from "aws-amplify";
import awsExports from "../aws-exports";

export const StrapiAPI = async (
  strapikey,
  requestBody = null,
  method = "GET",
  org = "TENANT1",
  version = "0.01"
) => {
  // ${awsExports.strapi_url_value_sets}
  
  const PROXY_API_URL = `/api/value-sets?filters[$and][0][valuesetkey][$eq]=${strapikey}`;
  const API_KEY = awsExports.strapi_readonly_token;
  let headers = {
    method: method,
    Authorization: `Bearer ${API_KEY}`,
    "Access-Control-Allow-Origin": "*",
  };
  // let headers = {
  //   // "Content-Type": "application/json",
  //   method: method,
  //   bearer: API_KEY,
  //   "Access-Control-Allow-Origin": "*",
  // };

  const requestOptions = {
    headers: headers,
    method: method.toUpperCase(),
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
    //const jsonRs = await response.json();

    let rsjson = await response.json();
    rsjson = rsjson.data.map((x) => {
      return <option value={x.attributes.code}>{x.attributes.display}</option>;
    });

    return rsjson;

    //   const jsonRs = await response.json();
    // setActionCount({ ...actionCount, count: actionCount.count + 1 });
  } catch (error) {
    console.log(error);
  }
};
