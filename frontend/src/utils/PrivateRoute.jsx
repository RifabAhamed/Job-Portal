import { Navigate } from "react-router-dom";



const isTokenExpired = (token) => {
  if (!token) return true;

  try {
    const parts = token.split(".");
    if (parts.length !== 3) {
      console.warn("Invalid token format");
      return true;
    }

    const payload = JSON.parse(atob(parts[1]));
    return payload.exp * 1000 < Date.now(); // exp is in seconds
  } catch (e) {
    console.error("Token decode failed:", e);
    return true; // treat invalid token as expired
  }
};



const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const expired = isTokenExpired(token);
  if (!token || expired) {
    localStorage.removeItem("token"); // cleanup if expired
    return <Navigate to="/login" />;
  }

  return children;
};


export default PrivateRoute;
