import { api } from "../services/index";
import authReducer from "./slices/authSlice";
import themeReducer from "./slices/themeSlice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    isAuth: authReducer,
    theme: themeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
