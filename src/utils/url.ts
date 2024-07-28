export const createApiUrl = (path: string) => {
  console.log(">> link", `${import.meta.env.VITE_API_URL}${path}`);
  return `${import.meta.env.VITE_API_URL}${path}`;
};
