import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Navigate } from "react-router-dom";

function OnlyAdmin(props) {
  const { role } = useContext(AuthContext);

  if (role === "admin") {
    return props.children;
  } else {
    return <Navigate to="/login" />; //mejorar esta direccion  a una pagina de error
  }
}

export default OnlyAdmin;
