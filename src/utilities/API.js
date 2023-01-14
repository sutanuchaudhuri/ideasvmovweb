import { Auth } from "aws-amplify";

export const API = async (proxyURL, requestBody = null, method = "GET") => {
  const PROXY_API_URL = "https://cors-anywhere.herokuapp.com/" + proxyURL; // "/poc1/Location";
  const API_KEY = "dQkMjACFXyyGvgp8Od2V5GZkLsjqkPu6eUnRIjYc";
  let loggedUser = await Auth.currentAuthenticatedUser();
  let COGNITO_TOKEN = loggedUser.signInUserSession.idToken.jwtToken;
  let headers = {
    "Content-Type": "application/json",
    method: method,
    mode: "no-cors",
    "x-api-key": API_KEY,
    Authorization: COGNITO_TOKEN,
  };

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
    console.log(`MAKING THE ${method} CALL .. with API infrastructure...`);
    const response = await fetch(PROXY_API_URL, requestOptions);

    if (!response.ok) {
      throw new Error("Something went wrong during location POST call!");
    }
    const jsonRs = await response.json();
    console.log("Response JSON");
    console.log(jsonRs);
    return jsonRs;
    //   const jsonRs = await response.json();
    // setActionCount({ ...actionCount, count: actionCount.count + 1 });
  } catch (error) {
    console.log(error);
  }
};
