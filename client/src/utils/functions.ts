/* eslint-disable @typescript-eslint/no-explicit-any */
import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";
import { userKey } from "./constants";

export const displayErrorMessage = (err: any) => {
  const defaultMsg = "Something went wrong, please try again!";
  if (Array.isArray(err?.data?.message)) {
    err?.data?.message?.forEach((msg: string) =>
      toast.error(msg || defaultMsg)
    );
  } else toast.error(err?.message || err?.data?.message || defaultMsg);
};

export const fullName = (data: any) =>
  `${data?.firstname || ""} ${data?.lastname || ""}`;

export const numberFormatter = (
  value: any,
  options?: Intl.NumberFormatOptions
) =>
  new Intl.NumberFormat("en-US", { notation: "compact", ...options }).format(
    value || 0
  );

export const imgToBase64 = (file: any, callbackFnc: (res: string) => void) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onloadend = () => {
    callbackFnc(reader.result?.toString() || "");
  };
};

export const decodeToken = (token: string) => {
  let decoded = null;
  if (token) decoded = jwtDecode<any>(token || "");
  return decoded;
};

export const setLSUser = (decodedToken: string) => {
  const jwtString = JSON.stringify(decodedToken);
  localStorage.setItem(userKey, jwtString);
  return jwtString;
};
