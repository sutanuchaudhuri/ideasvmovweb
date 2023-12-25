import { uiActions } from "./ui-slice";
import { locationActions } from "./location-slice";

import { API } from "../utilities/API";

const fetchData = async () => {
  console.log("Fetching Data....");
  const data = await API(
    "Location"
  );
  return data;
};

const sendRequest = async (location) => {
  location.resourceType = "Location";
  let url =
    "Location";
  let method = "POST";
  console.log("Sending Data....");
  if (location.id) {
    method = "PUT";
    url = url + "/" + location.id;
  }
  const data = await API(url, method);
  return data;
};

export const fetchLocationData = () => {
  return async (dispatch) => {
    try {
      console.log("Fetching location data fetchLocationData");
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
          message: "Fetching location data failed!",
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
