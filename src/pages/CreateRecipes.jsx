import { useState } from "react";
import { useNavigate } from "react-router-dom";
import service from "../services/service.config";

function CreateRecipes() {
  const navigate = useNavigate();

  const [createForm, setCreateForm] = useState({
    titulo: "",
    totalHC: "",
    raciones: "",
    photoURL: "",
    clasificacion: "",
    elaboracion: "",
    ingredientes: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCreateForm({ ...createForm, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); //para que el formulario no recargue toda la pagina

    try {
      await service.post("/recipes/create", createForm);

      navigate("/recipes");
    } catch (error) {
      console.log("Error al crear la receta", error);
      //añadir navigate con pagina de error
    }
  };

  return (
    <div>
      <h2>¡Crea tu receta!</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="titulo"
          placeholder="Título"
          value={createForm.titulo}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="totalHC"
          placeholder="Total HC"
          value={createForm.totalHC}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="raciones"
          placeholder="Raciones"
          value={createForm.raciones}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="photoURL"
          placeholder="URL de la foto"
          value={createForm.photoURL}
          onChange={handleChange}
        />
        <input
          type="text"
          name="clasificacion"
          placeholder="Clasificación"
          value={createForm.clasificacion}
          onChange={handleChange}
        />
        <textarea
          name="elaboracion"
          placeholder="Elaboración"
          value={createForm.elaboracion}
          onChange={handleChange}
        />
        {/* <input
          type="text"
          name="ingredientes"
          placeholder="Ingredientes"
          value={createForm.ingredientes}
          onChange={handleChange}
        /> */}

        <button type="submit">Crear receta</button>
      </form>
    </div>
  );
}
export default CreateRecipes;
