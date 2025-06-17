import { use, useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import service from "../services/service.config";
import { useNavigate } from "react-router-dom";
import Myrecipes from "./Myrecipes";

function EditRecipes() {
  const { recipesId } = useParams();
  const navigate = useNavigate();

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
    }
  };

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
      });
      navigate(`/recipes/myrecipes/${recipesId}`);
    } catch (error) {
      console.log("Error al actualizar receta", error);
    }
  };

  //funcion de borrar receta
  const deleteRecipe = async () => {
    try {
      await service.delete(`recipes/myrecipes/${recipesId}`);
      navigate("/recipes/myrecipes");
    } catch (error) {
      console.log("Error al eliminar la receta", error);
      //poner un navigate a una pagina de error(?)
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
        <input
          type="text"
          name="photoURL"
          value={editFrom.photoURL}
          onChange={handleChange}
          placeholder="URL de la foto"
        />
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
    </div>
  );
}
export default EditRecipes;
