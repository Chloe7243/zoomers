/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";
import { authTokenKey, userKey } from "@/utils/constants";
import { decodeToken, setLSUser } from "@/utils/functions";

let user = localStorage.getItem(userKey);
if (!user) {
  const token = localStorage.getItem(authTokenKey);
  const decodedToken = decodeToken(token || "");
  user = setLSUser(decodedToken);
}

const userSlice = createSlice({
  name: "user",
  initialState: JSON.parse(user),
  reducers: {
    removeUser: (state) => {
      state = null;
      return state;
    },
    setUser: (state, { payload }: { payload: string }) => {
      const decodedToken = decodeToken(payload);
      state = JSON.parse(setLSUser(decodedToken));
      return state;
    },
  },
});

export const { removeUser, setUser } = userSlice.actions;
export default userSlice.reducer;
