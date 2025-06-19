import { Link } from "react-router-dom";
import errorimg from "../images/Errorpage.png";

function ErrorPage() {
  return (
    <div>
      <img src={errorimg} alt="Imagen de error, volver a la pagina de inicio" />
      <Link to="/">
        <button>←</button>
      </Link>
    </div>
  );
}
export default ErrorPage;
