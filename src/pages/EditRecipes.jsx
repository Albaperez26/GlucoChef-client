import { use, useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import service from "../services/service.config";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function EditRecipes() {
  const { recipesId } = useParams();
  const navigate = useNavigate();

  const [imageUrl, setImageUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false); // for a loading animation effect

  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [editForm, setEditForm] = useState({
    titulo: "",
    totalHC: "",
    raciones: "",
    photoURL: "",
    clasificacion: "",
    elaboracion: "",
  });

  const getIngredients = async () => {
    try {
      const response = await service.get(`/ingredients`);
      setIngredients(response.data);
    } catch (error) {
      console.log("Error al acceder a los ingredientes", error);
      navigate("/error");
    }
  };

  const toggleIngredient = (ingredientId) => {
    setSelectedIngredients((prev) =>
      prev.includes(ingredientId)
        ? prev.filter((id) => id !== ingredientId)
        : [...prev, ingredientId]
    );
  };

  useEffect(() => {
    getRecipe();
  }, [recipesId]);

  useEffect(() => {
    getIngredients();
  }, []);

  const getRecipe = async () => {
    try {
      const response = await service.get(`/recipes/myrecipes/${recipesId}`);
      setEditForm(response.data);
      setSelectedIngredients(
        response.data.ingredientes.map((ingrediente) => ingrediente._id)
      );
    } catch (error) {
      console.log("Error cargando la receta");
      navigate("/error");
    }
  };

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
    setEditForm((latestForm) => ({ ...latestForm, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await service.put(`/recipes/myrecipes/${recipesId}/edit`, {
        ...editForm,
        ingredientes: selectedIngredients,
        photoURL: imageUrl,
      });
      navigate(`/recipes/myrecipes/${recipesId}`);
    } catch (error) {
      console.log("Error al actualizar receta", error);
      navigate("/error");
    }
  };

  //funcion de borrar receta
  const deleteRecipe = async () => {
    if (window.confirm("¿Estás seguro que deseas borrar la receta?")) {
      try {
        await service.delete(`recipes/myrecipes/${recipesId}`);
        navigate("/recipes/myrecipes");
      } catch (error) {
        console.log("Error al eliminar la receta", error);
        navigate("/error");
      }
    }
  };

  return (
    <div className="container my-4" style={{ maxWidth: "700px" }}>
      <h2 className="text-primary fw-bold">Editar Receta</h2>

      <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
        <div>
          <label htmlFor="titulo" className="form-label">
            Título de la receta <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            id="titulo"
            name="titulo"
            value={editForm.titulo}
            onChange={handleChange}
            placeholder="Ejemplo: Tarta de Manzana"
            className="form-control"
            required
          />
        </div>

        <div>
          <label htmlFor="totalHC" className="form-label">
            Hidratos de Carbono Totales <span className="text-danger">*</span>
          </label>
          <input
            type="number"
            id="totalHC"
            name="totalHC"
            value={editForm.totalHC}
            onChange={handleChange}
            placeholder="Ejemplo: 45"
            className="form-control"
            min="0"
            required
          />
        </div>

        <div>
          <label htmlFor="raciones" className="form-label">
            Número de Raciones <span className="text-danger">*</span>
          </label>
          <input
            type="number"
            id="raciones"
            name="raciones"
            value={editForm.raciones}
            onChange={handleChange}
            placeholder="Ejemplo: 4"
            className="form-control"
            min="1"
            required
          />
        </div>

        <div>
          <label htmlFor="image" className="form-label">
            Imagen de la receta
          </label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleFileUpload}
            disabled={isUploading}
            className="form-control"
            accept="image/*"
          />
          {isUploading && (
            <p className="text-muted mt-2">... Subiendo imagen</p>
          )}

          {imageUrl && (
            <div className="text-center my-3">
              <img
                src={imageUrl}
                alt="Imagen de la receta"
                style={{
                  maxWidth: "100%",
                  maxHeight: "250px",
                  objectFit: "contain",
                }}
              />
            </div>
          )}
        </div>

        <div>
          <label htmlFor="clasificacion" className="form-label">
            Clasificación
          </label>
          <input
            type="text"
            id="clasificacion"
            name="clasificacion"
            value={editForm.clasificacion}
            onChange={handleChange}
            placeholder="Ejemplo: Postre"
            className="form-control"
          />
        </div>

        <div>
          <label htmlFor="elaboracion" className="form-label">
            Elaboración <span className="text-danger">*</span>
          </label>
          <textarea
            id="elaboracion"
            name="elaboracion"
            value={editForm.elaboracion}
            onChange={handleChange}
            placeholder="Describe cómo preparar la receta..."
            rows="5"
            className="form-control"
            required
          />
        </div>

        <div>
          <label className="form-label fw-semibold">
            Selecciona los ingredientes
          </label>
          <ul
            style={{
              maxHeight: "180px",
              overflowY: "auto",
              listStyle: "none",
              paddingLeft: 0,
              border: "1px solid #ddd",
              borderRadius: "5px",
              marginBottom: "1rem",
            }}
          >
            {ingredients.map((ingredient) => (
              <li
                key={ingredient._id}
                className="px-3 py-1 border-bottom d-flex align-items-center"
              >
                <input
                  type="checkbox"
                  id={`ingredient-${ingredient._id}`}
                  checked={selectedIngredients.includes(ingredient._id)}
                  onChange={() => toggleIngredient(ingredient._id)}
                  className="form-check-input me-2"
                />
                <label
                  htmlFor={`ingredient-${ingredient._id}`}
                  className="mb-0"
                >
                  {ingredient.nombre}
                </label>
              </li>
            ))}
          </ul>
        </div>

        <div className="d-flex justify-content-between">
          <button
            type="button"
            onClick={deleteRecipe}
            className="btn btn-danger"
          >
            Eliminar receta
          </button>
          <button type="submit" className="btn btn-primary">
            Guardar cambios
          </button>
        </div>
      </form>

      <div className="text-center mt-4">
        <Link to="/recipes/myrecipes" className="btn btn-secondary">
          ← Volver atrás
        </Link>
      </div>
    </div>
  );
}
export default EditRecipes;
