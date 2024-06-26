import store, { RootState } from "../store/store";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
