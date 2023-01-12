import React, { useState, useCallback, useEffect } from "react";
import ViewProfileScreen from "./ViewProfileScreen";
import EditProfileScreen from "./EditProfileScreen";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
const TopTab = createMaterialTopTabNavigator();
const ProfileScreen = (props) => {
  return(
      <TopTab.Navigator>
        <TopTab.Screen name="View" component={ViewProfileScreen} />
        <TopTab.Screen name="Edit" component={EditProfileScreen} />
      </TopTab.Navigator>);

  //TODO: Pass the state by calling the service from here(state management)


}
export default ProfileScreen;
