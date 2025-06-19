import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import service from "../services/service.config";
import { Link } from "react-router-dom";

function OtherRecipesDetails() {
  const { recipesId } = useParams();

  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    getRecipe();
  }, []);

  const getRecipe = async () => {
    try {
      const response = await service.get(`/recipes/${recipesId}`);
      setRecipe(response.data);
    } catch (error) {
      console.error("Error encontrando recipe details:", error);
      navigate("/error");
    }
  };

  if (!recipe) {
    return (
      <div className="container text-center my-5">
        <h4 className="text-muted">Cargando detalles de la receta...</h4>
      </div>
    );
  }

  console.log(recipe);

  return (
    <div className="container my-5" style={{ maxWidth: "850px" }}>
      <div className="card shadow-lg p-4">
        <h1 className="text-center mb-4 text-primary">{recipe.titulo}</h1>

        {recipe.photoURL && (
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
        )}

        <div className="mb-3">
          <h2>
            <strong>📂 Clasificación:</strong> {recipe.clasificacion}
          </h2>
          <h2>
            <strong>🍞 Hidratos totales:</strong> {recipe.totalHC}
          </h2>
          <h2>
            <strong>🍽️ Raciones:</strong> {recipe.raciones}
          </h2>
        </div>

        <div className="mb-4">
          <h2 className="text-secondary">🧂 Ingredientes:</h2>
          {recipe.ingredientes?.length > 0 ? (
            <ul className="list-group list-group-flush">
              {recipe.ingredientes.map((ingrediente) => (
                <li key={ingrediente._id} className="list-group-item">
                  {ingrediente.nombre || "Nombre no disponible"}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted">No hay ingredientes añadidos.</p>
          )}
        </div>

        <div className="mb-4">
          <h2 className="text-secondary">📝 Elaboración:</h2>
          <p style={{ whiteSpace: "pre-line" }}>{recipe.elaboracion}</p>
        </div>

        <div className="text-center">
          <Link to="/recipes" className="btn btn-outline-primary">
            ← Volver atrás
          </Link>
        </div>
      </div>
    </div>
  );
}

export default OtherRecipesDetails;
