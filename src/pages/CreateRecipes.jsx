import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import service from "../services/service.config";
import { Link } from "react-router-dom";

function CreateRecipes() {
  const navigate = useNavigate();
  const [ingredients, setIngredients] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  const [imageUrl, setImageUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false); // for a loading animation effect

  const [createForm, setCreateForm] = useState({
    titulo: "",
    totalHC: "",
    raciones: "",
    photoURL: "",
    clasificacion: "",
    elaboracion: "",
    ingredientes: [],
  });

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
    setCreateForm({ ...createForm, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); //para que el formulario no recargue toda la pagina

    try {
      const updatedForm = {
        ...createForm,
        ingredientes: selectedIngredients,
        photoURL: imageUrl,
      };
      await service.post("/recipes/create", updatedForm);

      navigate("/recipes");
    } catch (error) {
      console.log("Error al crear la receta", error);
      navigate("/error");
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
        {/*<input
          type="text"
          name="photoURL"
          placeholder="URL de la foto"
          value={createForm.photoURL}
          onChange={handleChange}
        />
        */}
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
        {imageUrl ? (
          <div>
            <img src={imageUrl} alt="img" width={200} />
          </div>
        ) : null}
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
                  <th>Carbohidratos</th>
                  <th>Establecimiento</th>
                </tr>
              </thead>
              <tbody>
                {ingredients
                  .filter((ingrediente) =>
                    selectedIngredients.includes(ingrediente._id)
                  )
                  .map((ingredient) => (
                    <tr key={ingredients._id}>
                      <td>{ingredient.nombre}</td>
                      <td>{ingredient.hidratos} gr</td>
                      <td>{ingredient.establecimiento}</td>
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
      <Link to="/recipes/myrecipes">
        <button>←Volver atrás</button>
      </Link>
    </div>
  );
}
export default CreateRecipes;
