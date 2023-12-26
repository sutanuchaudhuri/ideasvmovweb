import {createSlice} from '@reduxjs/toolkit';
import { deleteLocationData } from "./location-actions";
// import { useSelector, useDispatch } from "react-redux";

const locationSlice = createSlice({
  name: "location",
  initialState: {
    items: [],
    mode: "VIEW",
    itemContext: {},
  },
  reducers: {
    replaceItems (state, action) {
        state.items=action.payload.items;
    },
    modifyItem(state, action) {},
    addItem(state, action) {

    },
    deleteItem(state, action) {
      const id = action.payload;
      state.changed = true;
      console.log(action.payload);
      //const existingItem = state.items.find((item) => item.id === id);
      state.items = state.items.filter((item) => item.resource.id !== id);
      //deleteLocationData;

    },
    onBeforeItemUpsert(state, action) {},
  },
});

export const locationActions=locationSlice.actions;
export default locationSlice;