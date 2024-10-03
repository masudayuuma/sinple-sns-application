export const calculateContentLength = (text: string) =>
  text.replace(/\n/g, "").length;
