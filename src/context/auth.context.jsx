import axios from "axios";
import { createContext, useEffect, useState } from "react";

const AuthContext = createContext(); //comparte los estados por toda la app

//componente que almacena y controla los estados del contexto

function AuthWrapper(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedUserId, setLoggedUserId] = useState(null);
  const [isValidatingToken, setIsValidatingToken] = useState(true);

  const authenticateUser = async () => {
    //valida el usuario y sabe quien es

    const authToken = localStorage.getItem("authToken");

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/auth/verify`,
        {
          headers: {
            authorization: `Bearer ${authToken}`,
          },
        }
      );

      //si llega aqui, significa que el token es válidado

      setIsLoggedIn(true);
      setLoggedUserId(response.data.payload._id);
      setIsValidatingToken(false);
    } catch (error) {
      //si llega aqui significa que el token no es válido
      setIsLoggedIn(false);
      setLoggedUserId(null);
      setIsValidatingToken(false);
    }
  };

  useEffect(() => {
    authenticateUser();
  }, []);
  const passedContext = {
    isLoggedIn,
    loggedUserId,
    authenticateUser,
  };

  if (isValidatingToken) {
    return <h3>... validando usuario</h3>;
  }

  return (
    <AuthContext.Provider value={passedContext}>
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthWrapper };
