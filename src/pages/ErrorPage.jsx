import { Link } from "react-router-dom";
import errorimg from "../images/Errorpage.png";

function ErrorPage() {
  return (
    <div className="container d-flex flex-column justify-content-center align-items-center text-center py-5">
      <img
        src={errorimg}
        alt="Error - volver a la página de inicio"
        className="img-fluid mb-4"
        style={{ maxHeight: "300px" }}
      />

      <h1 className="text-danger mb-3">¡Ups! Algo ha salido mal 😓</h1>
      <p className="text-muted mb-4">
        Parece que esta página no existe o se ha producido un error inesperado.
      </p>

      <Link to="/">
        <button className="btn btn-outline-primary btn-lg">
          ← Volver al inicio
        </button>
      </Link>
    </div>
  );
}
export default ErrorPage;
