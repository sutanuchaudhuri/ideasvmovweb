import { Auth } from "aws-amplify";

export const StrapiAPI = async (
  strapikey,
  requestBody = null,
  method = "GET",
  org = "TENANT1",
  version = "0.01"
) => {
  const PROXY_API_URL =
    "https://cors-anywhere.herokuapp.com/" +
    `http://54.242.213.239:1337/api/value-sets?filters[$and][0][valuesetkey][$eq]=${strapikey}&filters[$and][1][organization][$eq]=${org}&fields[0]=code&fields[1]=display&fields[2]=definition&fields[2]=valuesetkey&filters[$and][2][version][$eq]=${version}`;
  const API_KEY =
    "d2adecfa4e2dab28256fedbcc9bb3133e166bae1ae5a5f9e283dcbe82f87e17942f06e7d66bb9d7c42737f5a25133a222c892fae04772499688059fc578eb9ae20619e49de1859948df80645d4a0b9196bba5248dceefd38acfad2c74531ad28dcdc58260fee0e721007bbf8ddbb612b1608253b507411f4e49ad6605c7432ea";

  let headers = {
    // "Content-Type": "application/json",
    method: method,
    bearer: API_KEY,
  };

  const requestOptions = {
    // headers: headers,
    method: method.toUpperCase(),
  };
  console.log(requestOptions);
  if (method.toUpperCase() === "POST" || method.toUpperCase() === "PUT") {
    requestOptions.body =
      requestBody !== null ? JSON.stringify(requestBody) : {};
  }

  try {
    console.log(`MAKING THE ${method} CALL .. with STRAPI API`);
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
