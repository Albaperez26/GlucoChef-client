import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/signup">Registro</Link>
      <Link to="/login">Acceso</Link>
      <Link to="/ingredientes">Ingredientes</Link>
      <Link>Cerrar sesión</Link>
    </nav>
  );
}

export default NavBar;
