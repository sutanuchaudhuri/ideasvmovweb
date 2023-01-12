import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const addLocationReducer = createSlice({
  name: "locations",
  initialState,
  reducers: {
    //here we will write our reducer
    //Adding   a new Location
    addLocations: (state, action) => {
      state.push(action.payload);
      return state;
    },
    //remove locations
    removeLocations: (state, action) => {
      return state.filter((item) => item.id !== action.payload);
    },
    //update todos
    updateLocations: (state, action) => {
      return state.map((location) => {
        if (location.id === action.payload.id) {
          return {
            ...location,
            item: action.payload.item,
          };
        }
        return location;
      });
    },
    //completed
    // completeTodos: (state, action) => {
    //   return state.map((todo) => {
    //     if (todo.id === action.payload) {
    //       return {
    //         ...todo,
    //         completed: true,
    //       };
    //     }
    //     return todo;
    //   });
    // },
  },
});

export const { addLocations, removeLocations, updateLocations } =
  addLocationReducer.actions;
export const reducer = addLocationReducer.reducer;
