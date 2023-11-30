export const isUrl = (str?: string) => {
  if (str) {
    try {
      return Boolean(new URL(str));
    } catch (e) {
      return false;
    }
  }
  return false;
};
