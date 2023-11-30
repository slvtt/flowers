export const getBooleanFromQuery = (query?: string | string[]) => {
  if (query && !Array.isArray(query)) {
    if (query === "true") return true;
    if (query === "false") return false;
  }

  return undefined;
};
