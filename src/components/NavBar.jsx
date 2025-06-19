import { useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import logo from "../images/logo-glucochef.png";

import "./NavBar.css";

function NavBar() {
  const { isLoggedIn } = useContext(AuthContext);
  const { authenticateUser } = useContext(AuthContext);
  const { role } = useContext(AuthContext);
  const navigate = useNavigate();
  const { userId } = useParams();
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
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          <img
            src={logo}
            alt="Logo"
            style={{ width: "30px", height: "30px", marginRight: "8px" }}
            className="d-inline-block align-text-top"
          />
          GlucoChef
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/user">
                Perfil
              </Link>
            </li>

            {role === "admin" && (
              <li className="nav-item">
                <Link className="nav-link" to="/ingredients">
                  Ingredientes
                </Link>
              </li>
            )}

            {isLoggedIn ? (
              <li className="nav-item">
                <button
                  className="btn btn-outline-light ms-2"
                  onClick={handleLogout}
                >
                  Cerrar sesión
                </button>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/signup">
                    Registro
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Acceso
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
