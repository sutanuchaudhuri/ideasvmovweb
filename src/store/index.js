import {configureStore} from '@reduxjs/toolkit';
import uiSlice from "./ui-slice";
import locationSlice from "./location-slice";
const store = configureStore({
    reducer:{ui:uiSlice.reducer, location:locationSlice.reducer}
});
export default store;