import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

import "./NavBar.css";

function NavBar() {
  const { isLoggedIn } = useContext(AuthContext);
  const { authenticateUser } = useContext(AuthContext);
  const { role } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    localStorage.removeItem("authToken");

    try {
      await authenticateUser();

      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <nav className="nav-elements">
      <Link to="/" className="nav-button">
        Home
      </Link>
      {role === "admin" ? (
        <>
          <Link to="/ingredients" className="nav-button">
            Ingredientes
          </Link>
        </>
      ) : (
        <></>
      )}
      {isLoggedIn === true ? (
        <>
          <Link onClick={handleLogout} className="nav-button">
            Cerrar sesión
          </Link>
        </>
      ) : (
        <>
          <Link to="/signup" className="nav-button">
            Registro
          </Link>
          <Link to="/login" className="nav-button">
            Acceso
          </Link>
        </>
      )}
    </nav>
  );
}

export default NavBar;
