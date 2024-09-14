import { jwtDecode } from "jwt-decode";

export const isTokenExpired = (token: null | string) => {
  console.log(token);
  console.log(typeof token);
  if (!token) return true;
  try {
    const decodedToken = jwtDecode(token);
    console.log(decodedToken);
    const currentTime = Date.now() / 1000;
    return (decodedToken.exp as number) < currentTime;
  } catch (error) {
    console.error("Error decoding token:", error);
    return true;
  }
};
