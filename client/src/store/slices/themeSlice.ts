import { createSlice } from "@reduxjs/toolkit";
import { Theme } from "@/types";
import { uiThemeKey } from "@/utils/constants";


const themeSlice = createSlice({
  name: "theme",
  initialState: (localStorage.getItem(uiThemeKey) as Theme) || "system",
  reducers: {
    setTheme: (state, { payload }: { payload: Theme }) => {
      localStorage.setItem(uiThemeKey, payload);
      state = payload;
      return state;
    },
  },
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;


