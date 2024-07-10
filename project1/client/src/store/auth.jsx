import { createContext, useContext, useState, useEffect } from "react";


export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {

  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState("");
  const [isLoading, setLoading] = useState(true);
  const [services, setServices] = useState([]);
  const authorizationToken = `Bearer ${token}`;

  //function to stored the token in local storage
  const storeTokenInLS = (serverToken) => {
    setToken(serverToken);
    return localStorage.setItem("token", serverToken);
  };

  let isLoggedIn = !!token
  console.log("isLoggedIn: ", isLoggedIn);
  const LogoutUser = () => {
    setToken("");
    return localStorage.removeItem("token")
  };

  const userAuthentication = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/api/auth/user", {
        method: "GET",
        headers: {
          Authorization: authorizationToken
        },
      })

      if (response.ok) {
        const data = await response.json();
        console.log("User Data with JWT: ", data.userData);
        setUser(data.userData);
        setLoading(false);
      }else{
        console.log("Error fetching user: ");
        setLoading(true);

      }
    } catch (error) {
      console.log(error)
    }
  }

  const getServices = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/data/service", {
        method: "GET",
      });
      if (response.ok) {
        const serviceData = await response.json();
        console.log("This is service data: ", serviceData.msg);
        setServices(serviceData.msg); // the data is in serviceData.msg
      } else {
        console.log('Failed to fetch services');
      }
    } catch (error) {
      console.log(`Error from the front end of ${error}`);
    }
  };

  // JWT authentication to get current login data
  useEffect(() => {
    getServices();
    userAuthentication();
  }, [])

  return (
    <AuthContext.Provider value={{ storeTokenInLS, LogoutUser, isLoggedIn, user, services, authorizationToken, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth used outside of the Provider");
  }
  return authContextValue;
};