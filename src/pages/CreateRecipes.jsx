import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import service from "../services/service.config";

function CreateRecipes() {
  const navigate = useNavigate();
  const [ingredients, setIngredients] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);

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
      const updatedForm = {
        ...createForm,
        ingredientes: selectedIngredients,
      };
      await service.post("/recipes/create", updatedForm);

      navigate("/recipes");
    } catch (error) {
      console.log("Error al crear la receta", error);
      //añadir navigate con pagina de error
    }
  };

  useEffect(() => {
    getIngredients();
  }, []);

  const getIngredients = async () => {
    try {
      const response = await service.get(`/ingredients`);
      console.log(response);
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
        <h2>Ingredientes disponibles</h2>
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

        {/* Tabla de seleccionados */}
        <div>
          <h2>Ingredientes de la receta</h2>
          {selectedIngredients.length === 0 ? (
            <p>Selecciona ingredientes de la lista.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Ingrediente</th>
                </tr>
              </thead>
              <tbody>
                {selectedIngredients.map((ingredient) => (
                  <tr key={ingredients._id}>
                    <td>{ingredient}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

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
