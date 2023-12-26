import { uiActions } from "./ui-slice";
import { patientActions } from "./patient-slice";

import { API } from "../utilities/API";

const fetchData = async () => {
  console.log("Fetching Data....");
  const data = await API(
    "Patient"
  );
  return data;
};

const sendRequest = async (location) => {
  location.resourceType = "Patient";
  let url =
    "Patient";
  let method = "POST";
  console.log("Sending Data....");
  if (location.id) {
    method = "PUT";
    url = url + "/" + patient.id;
  }
  const data = await API(url, method);
  return data;
};

export const fetchLocationData = () => {
  return async (dispatch) => {
    try {
      console.log("Fetching patient data fetchLocationData");
      const locationData = await fetchData();
      dispatch(
        locationActions.replaceItems({
          items: locationData.entry || [],
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Fetching patient data failed!",
        })
      );
    }
  };
};

export const sendLocationData = (location) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "Sending...",
        message: "Sending location data!",
      })
    );

    try {
      await sendRequest(location);

      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success!",
          message: "Sent location data successfully!",
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Sending location data failed!",
        })
      );
    }
  };
};
