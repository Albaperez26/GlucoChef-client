import service from "../../services/service.config";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/auth.context";
import { useNavigate } from "react-router-dom";

function Login() {
  const { authenticateUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState(null);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleLogin = async (e) => {
    e.preventDefault();

    // ... contactar al backend para validar credenciales de usuario aqui
    const userCredentials = {
      email,
      password,
    };

    try {
      const response = await service.post(`/auth/login`, userCredentials);
      console.log("usuario validado por el back", response);

      //almacenamos el token
      localStorage.setItem("authToken", response.data.authToken);

      //crear contexto y act los estados
      await authenticateUser();

      //redireccionar al user admin a pag privada
      navigate("/");
    } catch (error) {
      console.log(error);

      if (error.response.status === 400) {
        //los errores de cliente se muestran al user
        setErrorMessage(error.response.data.errorMessage);
      }
    }
  };

  return (
    <div>
      <h1>Formulario de Acceso</h1>

      <form onSubmit={handleLogin}>
        <label>Correo Electronico:</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
        />

        <br />

        <label>Contraseña:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
        />

        <br />

        <button type="submit">Acceder</button>
        {errorMessage && <p>{errorMessage}</p>}
      </form>
    </div>
  );
}

export default Login;
