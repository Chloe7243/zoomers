/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";
import { authTokenKey } from "@/utils/constants";
import { jwtDecode } from "jwt-decode";

const token = localStorage.getItem(authTokenKey);
let decoded;
if (token) decoded = jwtDecode<any>(token || "");

const userSlice = createSlice({
  name: "user",
  initialState: !token ? null : {...decoded },
  reducers: {
    removeUser: (state) => {
      state = null;
      return state;
    },
  },
});

export const { removeUser } = userSlice.actions;
export default userSlice.reducer;
