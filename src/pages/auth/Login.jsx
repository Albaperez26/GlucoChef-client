import service from "../../services/service.config";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/auth.context";
import { useNavigate } from "react-router-dom";
import img500 from "../../images/error500.png";

function Login() {
  const { authenticateUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState(null);
  const [serverError, setServerError] = useState(false);

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleLogin = async (e) => {
    e.preventDefault();

    setErrorMessage(null);
    setServerError(false);

    const userCredentials = { email, password };

    try {
      const response = await service.post(`/auth/login`, userCredentials);
      console.log("usuario validado por el back", response);

      localStorage.setItem("authToken", response.data.authToken);

      await authenticateUser();

      navigate("/");
    } catch (error) {
      console.log(error);

      if (error.response?.status === 400) {
        setErrorMessage(error.response.data.errorMessage);
      } else if (error.response?.status === 500) {
        setServerError(true);
      } else {
        setErrorMessage("Error desconocido, inténtalo más tarde.");
      }
    }
  };

  if (serverError) {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center vh-100">
        <img
          src={img500}
          alt="Error del servidor"
          style={{ maxWidth: "300px" }}
        />
        <p className="mt-3 text-danger fw-bold">
          Ha ocurrido un error en el servidor. Por favor, inténtalo más tarde.
        </p>
      </div>
    );
  }

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div
        className="card shadow p-4"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <h1 className="text-center mb-4">Acceso a la cuenta</h1>

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Correo Electrónico
            </label>
            <input
              id="email"
              type="email"
              className="form-control"
              name="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="ejemplo@correo.com"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="form-label">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              className="form-control"
              name="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="********"
              required
            />
          </div>

          {errorMessage && (
            <div className="alert alert-danger text-center" role="alert">
              {errorMessage}
            </div>
          )}

          <button type="submit" className="btn btn-primary w-100">
            Acceder
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
