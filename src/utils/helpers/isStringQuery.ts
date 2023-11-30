export const isStringQuery = (query?: string[] | string): query is string =>
  typeof query === "string";
