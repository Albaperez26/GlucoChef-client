import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

function NavBar() {
  const { isLoggedIn } = useContext(AuthContext);
  const { authenticateUser } = useContext(AuthContext);
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
    <nav>
      <Link to="/">Home</Link>
      {isLoggedIn === true ? (
        <>
          <Link to="/ingredientes">Ingredientes</Link>
          <Link onClick={handleLogout}>Cerrar sesión</Link>
        </>
      ) : (
        <>
          <Link to="/signup">Registro</Link>
          <Link to="/login">Acceso</Link>
        </>
      )}
    </nav>
  );
}

export default NavBar;
