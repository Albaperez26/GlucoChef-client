import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import service from "../services/service.config";
import img500 from "../images/error500.png";
import { Link } from "react-router-dom";

function EditUser() {
  const { userId } = useParams();
  const navigate = useNavigate();

  const [imageUrl, setImageUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false); // for a loading animation effect

  const [editForm, setEditForm] = useState({
    username: "",
    photoURL: "",
    typeofdiabetes: "",
    insulinaxracion: "",
  });

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await service.get(`/user`);
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

  //start cloudinary
  const handleFileUpload = async (event) => {
    if (!event.target.files[0]) {
      // to prevent accidentally clicking the choose file button and not selecting a file
      return;
    }
    setIsUploading(true);

    const uploadData = new FormData(); // images and other files need to be sent to the backend in a FormData
    uploadData.append("image", event.target.files[0]);

    try {
      const response = await service.post("/upload", uploadData);
      // !IMPORTANT: Adapt the request structure to the one in your proyect (services, .env, auth, etc...)

      setImageUrl(response.data.photoURL);
      //                          |
      //     this is how the backend sends the image to the frontend => res.json({ imageUrl: req.file.path });

      setIsUploading(false); // to stop the loading animation
    } catch (error) {
      navigate("/error");
    }
  };
  //fin cloudinary

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
      const response = await service.patch(`/user/edit`, {
        ...editForm,
        photoURL: imageUrl,
      });
      console.log("usuario actualizado", response.data);

      if (response.status === 200) {
        navigate(`/user`);
      } else if (error.response.status === 500) {
        return <img src={img500} alt="Imagen de error del servidor"></img>;
      }
    } catch (error) {
      console.log("Error al editar el usuario", error);
      navigate("/error");
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
        {/*<input
          name="photoURL"
          value={editForm.photoURL}
          onChange={handleChange}
          placeholder="URL de foto"
        />*/}
        <label>Imagen: </label>
        <input
          type="file"
          name="image"
          onChange={handleFileUpload}
          disabled={isUploading}
        />
        {isUploading ? <h3>... uploading image</h3> : null}
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
        {imageUrl ? (
          <div>
            <img src={imageUrl} alt="img" width={200} />
          </div>
        ) : null}

        <Link to="/user">
          <button>←Volver atrás</button>
        </Link>

        <button type="button" onClick={handleSubmit}>
          Guardar cambios
        </button>
      </form>
    </div>
  );
}

export default EditUser;
