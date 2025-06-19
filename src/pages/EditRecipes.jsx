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
  const [editFrom, setEditForm] = useState({
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
        ...editFrom,
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
    try {
      await service.delete(`recipes/myrecipes/${recipesId}`);
      navigate("/recipes/myrecipes");
    } catch (error) {
      console.log("Error al eliminar la receta", error);
      navigate("/error");
    }
  };

  return (
    <div>
      <h2>EDITAR RECETA</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="titulo"
          value={editFrom.titulo}
          onChange={handleChange}
          placeholder="Titulo"
        />
        <input
          type="number"
          name="totalHC"
          value={editFrom.totalHC}
          onChange={handleChange}
          placeholder="HC Totales"
        />
        <input
          type="number"
          name="raciones"
          value={editFrom.raciones}
          onChange={handleChange}
          placeholder="Raciones"
        />
        <label>Imagen: </label>
        <input
          type="file"
          name="image"
          onChange={handleFileUpload}
          disabled={isUploading}
        />
        {isUploading ? <h3>... uploading image</h3> : null}
        <input
          type="text"
          name="clasificacion"
          value={editFrom.clasificacion}
          onChange={handleChange}
          placeholder="Clasificación"
        />
        <textarea
          name="elaboracion"
          value={editFrom.elaboracion}
          onChange={handleChange}
          placeholder="Elaboración"
        />
        {imageUrl ? (
          <div>
            <img src={imageUrl} alt="img" width={200} />
          </div>
        ) : null}
        <h2>Ingredientes disponibles</h2>
        <ul
          style={{ maxHeight: "200px", maxWidth: "600px", overflowY: "auto" }}
        ></ul>
        <h2>Ingredientes:</h2>
        <ul
          style={{ maxHeight: "200px", maxWidth: "600px", overflowY: "auto" }}
        >
          {ingredients.map((ingredient) => (
            <li key={ingredient._id}>
              <label>
                <input
                  type="checkbox"
                  checked={selectedIngredients.includes(ingredient._id)}
                  onChange={() => toggleIngredient(ingredient._id)}
                />
                {ingredient.nombre}
              </label>
            </li>
          ))}
        </ul>
        <button type="submit">Guardar cambios</button>
        <button onClick={deleteRecipe}>Eliminar receta</button>
      </form>
      <Link to="/recipes/myrecipes">
        <button>←Volver atrás</button>
      </Link>
    </div>
  );
}
export default EditRecipes;
