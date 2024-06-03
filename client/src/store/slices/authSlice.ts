import toast from "react-hot-toast";
import { createSlice } from "@reduxjs/toolkit";
import { authTokenKey, userKey } from "@/utils/constants";

const token = localStorage.getItem(authTokenKey);

const authSlice = createSlice({
  name: "isAuth",
  initialState: token ? true : false,
  reducers: {
    authenticate: () => {
      return true;
    },
    revokeAuthentication: (state) => {
      localStorage.removeItem(userKey);
      toast.error("Not authorized", { id: "unauthorized" });
      state = false;
      return state;
    },
    logoutUser: (state) => {
      localStorage.removeItem(authTokenKey);
      localStorage.removeItem(userKey);
      toast.success("Logged out successfully", { id: "unauthorized" });
      state = false;
      return state;
    },
  },
});

export const { authenticate, revokeAuthentication, logoutUser } =
  authSlice.actions;
export default authSlice.reducer;
