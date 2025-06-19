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

  if (!user)
    return (
      <div div className="text-center mt-5">
        Cargando usuario...
      </div>
    );
  return (
    <div className="container my-5">
      <div className="text-center mb-4">
        <h2 className="ffw-bold text-primary">Perfil de {user.username}</h2>
      </div>
      <div className="row justify-content-center align-items-center">
        <div className="col-12 col-md-4 text-center mb-4">
          <div
            style={{
              width: "250px",
              height: "250px",
              borderRadius: "50%",
              overflow: "hidden",
              margin: "0 auto",
              backgroundColor: "#f8f9fa",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src={user.photoURL || imguser}
              alt={`Imagen de perfil de: ${user.username}`}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
              }}
            />
          </div>
        </div>
        <div className="col-12 col-md-6">
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <strong>Email:</strong> {user.email}
            </li>
            <li className="list-group-item">
              <strong>Tipo de diabetes:</strong> {user.typeofdiabetes}
            </li>
            <li className="list-group-item">
              <strong>Insulina rápida por ración:</strong>{" "}
              {user.insulinaxracion}
            </li>
          </ul>

          <div className="mt-4 d-flex justify-content-center gap-3">
            <Link to="/" className="btn btn-outline-secondary">
              ← Volver atrás
            </Link>
            <Link to="/user/edit" className="btn btn-primary">
              Editar perfil
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
export default UserPage;
