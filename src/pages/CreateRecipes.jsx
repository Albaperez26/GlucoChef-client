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
    <div className="container my-4" style={{ maxWidth: "700px" }}>
      <h2 className="text-primary fw-bold">¡Crea tu receta!</h2>

      <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
        <div>
          <label htmlFor="titulo" className="form-label">
            Título de la receta <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            id="titulo"
            name="titulo"
            placeholder="Ejemplo: Tarta de Manzana"
            value={createForm.titulo}
            onChange={handleChange}
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
            placeholder="Ejemplo: 45"
            value={createForm.totalHC}
            onChange={handleChange}
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
            placeholder="Ejemplo: 4"
            value={createForm.raciones}
            onChange={handleChange}
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
            placeholder="Ejemplo: Postre"
            value={createForm.clasificacion}
            onChange={handleChange}
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
            placeholder="Describe cómo preparar la receta..."
            value={createForm.elaboracion}
            onChange={handleChange}
            rows="5"
            className="form-control"
            required
          />
        </div>

        <div>
          <label className="form-label fw-semibold">
            Ingredientes disponibles
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

        <div>
          <label className="form-label fw-semibold">
            Ingredientes de la receta
          </label>
          {selectedIngredients.length === 0 ? (
            <p>Selecciona ingredientes de la lista.</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-striped table-bordered">
                <thead>
                  <tr>
                    <th>Ingrediente</th>
                    <th>Carbohidratos (gr)</th>
                    <th>Establecimiento</th>
                  </tr>
                </thead>
                <tbody>
                  {ingredients
                    .filter((ingrediente) =>
                      selectedIngredients.includes(ingrediente._id)
                    )
                    .map((ingredient) => (
                      <tr key={ingredient._id}>
                        <td>{ingredient.nombre}</td>
                        <td>{ingredient.hidratos} gr</td>
                        <td>{ingredient.establecimiento}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="d-flex justify-content-between">
          <button type="submit" className="btn btn-primary">
            Crear receta
          </button>
          <Link to="/recipes/myrecipes" className="btn btn-secondary">
            ← Volver atrás
          </Link>
        </div>
      </form>
    </div>
  );
}
export default CreateRecipes;
