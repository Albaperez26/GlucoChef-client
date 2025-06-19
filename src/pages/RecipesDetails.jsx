import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import service from "../services/service.config";
import { Link } from "react-router-dom";

function RecipeDetails() {
  const { recipesId } = useParams();

  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    getRecipe();
  }, []);

  const getRecipe = async () => {
    try {
      const response = await service.get(`/recipes/myrecipes/${recipesId}`);
      setRecipe(response.data);
    } catch (error) {
      console.error("Error encontrando recipe details:", error);
      navigate("/error");
    }
  };

  if (!recipe) {
    return (
      <div className="container text-center mt-5">
        <h3>Cargando detalles de la receta...</h3>
      </div>
    );
  }

  console.log(recipe);

  return (
    <div className="container my-5" style={{ maxWidth: "850px" }}>
      <div className="card shadow-lg p-4">
        {recipe.photoURL ? (
          <div className="text-center mb-4">
            <img
              src={recipe.photoURL}
              alt=""
              className="img-fluid rounded shadow"
              style={{
                maxHeight: "350px",
                objectFit: "cover",
                border: "4px solid #dee2e6",
              }}
            />
          </div>
        ) : (
          <div
            className="d-flex align-items-center justify-content-center bg-light rounded shadow mb-4"
            style={{ height: "350px", border: "4px dashed #ccc" }}
          >
            <span className="text-muted">📷 Sin imagen disponible</span>
          </div>
        )}

        <h1 className="text-center text-primary mb-4">{recipe.titulo}</h1>

        <ul className="list-group list-group-flush mb-4">
          <li className="list-group-item">
            <strong>📂 Clasificación:</strong> {recipe.clasificacion || "N/A"}
          </li>
          <li className="list-group-item">
            <strong>🍞 Total HC:</strong> {recipe.totalHC || "N/A"}
          </li>
          <li className="list-group-item">
            <strong>🍽️ Raciones:</strong> {recipe.raciones || "N/A"}
          </li>
        </ul>

        <div className="mb-4">
          <h2 className="text-primary">🧂 Ingredientes:</h2>
          {recipe.ingredientes && recipe.ingredientes.length > 0 ? (
            <ul className="list-group list-group-flush">
              {recipe.ingredientes.map((ingrediente) => (
                <li className="list-group-item" key={ingrediente._id}>
                  {ingrediente.nombre || "Nombre no disponible"}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted">No hay ingredientes listados</p>
          )}
        </div>

        <div className="mb-4">
          <h2 className="text-primary">📝 Elaboración:</h2>
          <p style={{ whiteSpace: "pre-line" }}>
            {recipe.elaboracion || "No hay detalles de elaboración."}
          </p>
        </div>

        <div className="d-flex justify-content-center gap-3">
          <Link to={`/recipes/myrecipes/${recipe._id}/edit`}>
            <button className="btn btn-primary">✏️ Editar receta</button>
          </Link>

          <Link to="/recipes/myrecipes">
            <button className="btn btn-outline-secondary">
              ← Volver atrás
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default RecipeDetails;
