/* eslint-disable @typescript-eslint/no-explicit-any */

export type Any =
  | string
  | number
  | boolean
  | object
  | { [key: string]: Any }
  | null
  | undefined;

export type Theme = "dark" | "light" | "system";

export interface GridProps {
  width?: number; // The width of the grid in pixels
  columns?: number; // The number of columns in the grid
  key?: string; // Unique key to force re-render the grid (optional)
  noLink?: boolean; // If true, GIFs won't link to their Giphy page (optional)
  hideAttribution?: boolean; // If true, the Giphy attribution will be hidden (optional)
  borderRadius?: number; // Border radius of each GIF item (optional)
  gifHeight?: number; // Height of each GIF in the grid (optional)
  backgroundColor?: string; // Background color of the grid container (optional)
  className?: string; // Custom class name for the grid container (optional)
  hideLoader?: boolean; // If true, hides the loading spinner (optional)
}


export interface UserCredentials {
  email: string;
  password: string;
  username: string;
  firstname: string;
  lastname: string;
  dob: string;
}

export interface PostData {
  content: string;
  media?: string;
}
