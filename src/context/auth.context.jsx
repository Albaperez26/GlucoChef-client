import service from "../services/service.config";
import { createContext, useEffect, useState } from "react";

const AuthContext = createContext(); //comparte los estados por toda la app

//componente que almacena y controla los estados del contexto

function AuthWrapper(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedUserId, setLoggedUserId] = useState(null);
  const [isValidatingToken, setIsValidatingToken] = useState(true);
  const [role, setRole] = useState(null);

  const authenticateUser = async () => {
    //valida el usuario y sabe quien es
    try {
      const response = await service.get(`/auth/verify`);
      console.log(response);

      //si llega aqui, significa que el token es válidado

      setIsLoggedIn(true);
      setLoggedUserId(response.data.payload._id);
      setRole(response.data.payload.role);
      setIsValidatingToken(false);
    } catch (error) {
      //si llega aqui significa que el token no es válido
      setIsLoggedIn(false);
      setLoggedUserId(null);
      setRole(null);
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
    role,
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
