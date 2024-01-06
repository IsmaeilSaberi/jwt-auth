import { createSlice } from "@reduxjs/toolkit";

const roleSlice = createSlice({
  name: "role",
  initialState: { value: 5 },
  reducers: {
    userToLogout: (state) => {
      state.value = 5;
    },
    userToUsual: (state) => {
      state.value = 3;
    },
    userToAdmin: (state) => {
      state.value = 1;
    },
  },
});

export const { userToLogout, userToUsual, userToAdmin } = roleSlice.actions;
export default roleSlice.reducer;
