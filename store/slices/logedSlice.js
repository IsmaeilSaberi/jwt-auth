import { createSlice } from "@reduxjs/toolkit";

const logedSlice = createSlice({
  name: "loged",
  initialState: { value: -1 },
  reducers: {
    userLogedTrue: (state) => {
      state.value = 1;
    },
    userLogedFalse: (state) => {
      state.value = -1;
    },
  },
});

export const { userLogedFalse, userLogedTrue } = logedSlice.actions;
export default logedSlice.reducer;
