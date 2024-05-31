import { giphyApi } from "@/services/giphy";
import { api } from "@/services/index";
import authReducer from "./slices/authSlice";
import userReducer from "./slices/userSlice";
import themeReducer from "./slices/themeSlice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    [giphyApi.reducerPath]: giphyApi.reducer,
    user: userReducer,
    isAuth: authReducer,
    theme: themeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(giphyApi.middleware).concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
