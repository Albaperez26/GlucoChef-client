import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import service from "../services/service.config";

function EditUser() {
  const { userId } = useParams();
  const navigate = useNavigate();

  const [editForm, setEditForm] = useState({
    username: "",
    photoURL: "",
    typeofdiabetes: "",
    insulinaxracion: "",
  });

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await service.get(`/user/${userId}`);
        setEditForm({
          username: response.data.username || "",
          photoURL: response.data.photoURL || "",
          typeofdiabetes: response.data.typeofdiabetes || "",
          insulinaxracion: response.data.insulinaxracion || "",
        });
      } catch (error) {
        console.log("Error al recibir los datos anteriores del usuario", error);
      }
    };
    getUser();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditForm((latest) => ({
      ...latest,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await service.patch(`/user/${userId}/edit`, editForm);
      console.log("usuario actualizado", response.data);

      if (response.status === 200) {
        navigate(`/user/${userId}`);
      }
    } catch (error) {
      console.log("Error al editar el usuario", error);
    }
  };

  return (
    <div>
      <h3>Pagina de editar usuario</h3>
      <form onSubmit={handleSubmit}>
        <input
          name="username"
          value={editForm.username}
          onChange={handleChange}
          placeholder="Nombre de usuario"
        />
        <input
          name="photoURL"
          value={editForm.photoURL}
          onChange={handleChange}
          placeholder="URL de foto"
        />
        <input
          name="typeofdiabetes"
          value={editForm.typeofdiabetes}
          onChange={handleChange}
          placeholder="Tipo de diabetes"
        />
        <input
          name="insulinaxracion"
          value={editForm.insulinaxracion}
          onChange={handleChange}
          placeholder="Insulina por ración"
        />
        <button type="button" onClick={handleSubmit}>
          Guardar cambios
        </button>
      </form>
    </div>
  );
}

export default EditUser;
