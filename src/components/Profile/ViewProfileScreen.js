import React, { useState, useCallback, useEffect } from "react";

import LabelKeyValContainer from "../UI/LabelKeyValContainer";
import Auth from "@aws-amplify/auth";

const initialStateCognitoUser = {};
const ViewProfileScreen = ({navigation,route}) => {
  const [userProfile, setUserProfile] = useState(initialStateCognitoUser);
const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    await Auth.currentAuthenticatedUser({
      bypassCache: true, // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
    }).then((user) => {
      ////console.log(`User ## ${JSON.stringify(user)}`);
      setUserProfile(user["attributes"]);
      setLoading(false);
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  } else {
    return (
      <View
     
      >
        <LabelKeyValContainer
          keyText="First name"
          valText={userProfile.given_name}
        />

      </View>
    );
  }
};

export default ViewProfileScreen;
