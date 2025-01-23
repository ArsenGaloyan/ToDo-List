import { createSlice } from "@reduxjs/toolkit";

const FILTRES = {
  ALL: "all",
  ACTIVE: "active",
  COMPLETED: "completed"
};
const initialState = FILTRES.ALL;




const visionSlice = createSlice ({
name : 'vision',
initialState,
reducers:{
  setVision: (state, action) => action.payload,
}
})

export const { setVision } = visionSlice.actions;
export default visionSlice.reducer;
export { FILTRES };