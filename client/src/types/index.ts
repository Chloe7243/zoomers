export type Any =
  | string
  | number
  | boolean
  | object
  | { [key: string]: Any }
  | null
  | undefined;

 export type Theme = "dark" | "light" | "system";