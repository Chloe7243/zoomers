import toast from "react-hot-toast";
import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "isAuth",
  initialState: localStorage.getItem("authToken") ? true : false,
  reducers: {
    authenticate: (state) => {
      state = true;
      return state;
    },
    revokeAuthentication: (state) => {
      localStorage.removeItem("authToken");
      toast.error("Not authorized", { id: "unauthorized" });
      state = false;
      return state;
    },
    logoutUser: (state) => {
      localStorage.removeItem("authToken");
      toast.success("Logged out successfully", { id: "unauthorized" });
      state = false;
      return state;
    },
  },
});

export const { authenticate, revokeAuthentication, logoutUser } =
  authSlice.actions;
export default authSlice.reducer;
