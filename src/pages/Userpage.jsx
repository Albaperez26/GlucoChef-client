import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import service from "../services/service.config";
import imguser from "../images/userpredeterminada.png";

function UserPage() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUser();
  }, [userId]);

  const getUser = async () => {
    try {
      const response = await service.get(`/user`);
      setUser(response.data);
    } catch (error) {
      console.log("Error al encontrar el usuario", error);
      navigate("/error");
    }
  };

  if (!user) return <div>Cargando usuario...</div>;
  return (
    <div>
      <h2>Página de usuario</h2>
      <h2>Perfil de {user.username}</h2>
      <img
        src={user.photoURL || imguser}
        alt={`Imagen de perfil de: ${user.username}`}
      />

      <p>Email: {user.email}</p>
      <p>Tipo de diabetes: {user.typeofdiabetes}</p>
      <p>Insulina rápida por ración: {user.insulinaxracion}</p>

      <Link to="/">
        <button>←Volver atrás</button>
      </Link>

      <Link to="/user/edit">
        <button>Editar</button>
      </Link>
    </div>
  );
}
export default UserPage;
