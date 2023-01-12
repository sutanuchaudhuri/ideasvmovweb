import React, { useState, useCallback, useEffect } from "react";
import { Auth } from "aws-amplify";
import { API } from "../../utilities/API";
const LocationContext=React.createContext({
    locationList:[],
    addItem:(item)=>{},
    removeItem:(id)=>{},
    updateItem:(id,item)=>{},
    locationSearchCriteria:{},
    clearFilter:()=>{},
    onSearchCriteriaSubmitted:()=>{}
});



export default LocationContext;
