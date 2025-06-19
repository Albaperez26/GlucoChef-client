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
    <div className="container my-5">
      <h2 className="text-center mb-4 fw-bold text-primary">Editar Perfil</h2>
      <form
        onSubmit={handleSubmit}
        className="mx-auto"
        style={{ maxWidth: "500px" }}
      >
        <div className="mb-3">
          <label htmlFor="username" className="form-label fw-semibold">
            Nombre de usuario
          </label>
          <input
            id="username"
            name="username"
            type="text"
            className="form-control text-center"
            value={editForm.username}
            onChange={handleChange}
            placeholder="Nombre de usuario"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="image" className="form-label fw-semibold">
            Imagen de perfil
          </label>
          <input
            id="image"
            type="file"
            name="image"
            className="form-control text-center"
            onChange={handleFileUpload}
            disabled={isUploading}
          />
          {isUploading && (
            <div className="form-text text-primary">Subiendo imagen...</div>
          )}
        </div>

        {imageUrl && (
          <div className="text-center mb-3">
            <img
              src={imageUrl}
              alt="Previsualización"
              className="img-fluid rounded shadow"
              style={{ maxWidth: "200px", height: "auto" }}
            />
          </div>
        )}

        <div className="mb-3">
          <label htmlFor="typeofdiabetes" className="form-label fw-semibold">
            Tipo de diabetes
          </label>
          <input
            id="typeofdiabetes"
            name="typeofdiabetes"
            type="text"
            className="form-control text-center"
            value={editForm.typeofdiabetes}
            onChange={handleChange}
            placeholder="Tipo de diabetes"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="insulinaxracion" className="form-label fw-semibold">
            Insulina por ración
          </label>
          <input
            id="insulinaxracion"
            name="insulinaxracion"
            type="text"
            className="form-control text-center"
            value={editForm.insulinaxracion}
            onChange={handleChange}
            placeholder="Insulina por ración"
          />
        </div>

        <div className="d-flex justify-content-between">
          <Link to="/user" className="btn btn-outline-secondary">
            ← Volver
          </Link>
          <button type="submit" className="btn btn-primary">
            Guardar cambios
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditUser;
