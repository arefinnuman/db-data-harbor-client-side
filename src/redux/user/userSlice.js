import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {},
  reducers: {},
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
