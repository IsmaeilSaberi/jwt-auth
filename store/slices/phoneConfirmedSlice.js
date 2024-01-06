import { createSlice } from "@reduxjs/toolkit";

const phoneConfirmedSlice = createSlice({
  name: "phoneConfirmed",
  initialState: { value: -1 },
  reducers: {
    userPhoneConfirmedTrue: (state) => {
      state.value = 1;
    },
    userPhoneConfirmedFalse: (state) => {
      state.value = -1;
    },
  },
});

export const { userPhoneConfirmedTrue, userPhoneConfirmedFalse } =
  phoneConfirmedSlice.actions;
export default phoneConfirmedSlice.reducer;
