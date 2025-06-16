import { use, useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import service from "../services/service.config";
import { useNavigate } from "react-router-dom";
import Myrecipes from "./Myrecipes";

function EditRecipes() {
  const { recipesId } = useParams();
  const navigate = useNavigate();
  const [editFrom, setEditForm] = useState({
    titulo: "",
    totalHC: "",
    raciones: "",
    photoURL: "",
    clasificacion: "",
    elaboracion: "",
    ingredientes: "",
  });

  useEffect(() => {
    const editRecipe = async () => {
      try {
        const response = await service.get(`/recipes/myrecipes/${recipesId}`);
        setEditForm(response.data);
        console.log(response.data);
      } catch (error) {
        console.log("Error cargando la receta");
      }
    };
    editRecipe();
  }, [recipesId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditForm((latestForm) => ({ ...latestForm, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await service.put(`/recipes/${recipesId}`, editFrom);
      navigate("/recipes/myrecipes");
    } catch (error) {
      console.log("Error al actualizar receta", error);
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
        <textarea
          name="ingredientes"
          value={editFrom.ingredientes}
          onChange={handleChange}
          placeholder="Ingredientes"
        />
        <button type="submit">Guardar cambios</button>
      </form>
    </div>
  );
}
export default EditRecipes;
