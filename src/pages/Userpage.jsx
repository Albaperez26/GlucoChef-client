import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import service from "../services/service.config";
import imguser from "../images/userpredeterminada.png";

function UserPage() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await service.get(`/user/${userId}`);
        setUser(response.data);
      } catch (error) {
        console.log("Error al encontrar el usuario", error);
        //navigate a una pagina de error al cargar el user
      }
    };
    getUser();
  }, [userId]);

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

      <button>Editar</button>
    </div>
  );
}
export default UserPage;
