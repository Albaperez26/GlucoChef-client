import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import service from "../services/service.config";

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
      // Navegar a página de error si falla la petición
    }
  };

  if (!recipe) {
    return <h3>Cargando detalles de la receta...</h3>;
  }

  console.log(recipe);

  return (
    <div className="recipe-details">
      <h1>{recipe.titulo}</h1>
      <img src={recipe.photoURL} alt={recipe.titulo} className="recipe-image" />
      <p>
        <strong>Clasificación:</strong> {recipe.clasificacion}
      </p>
      <p>
        <strong>Total HC:</strong> {recipe.totalHC}
      </p>
      <p>
        <strong>Raciones:</strong> {recipe.raciones}
      </p>

      <h3>Ingredientes:</h3>
      <ul>
        {recipe.ingredientes && recipe.ingredientes.length > 0 ? (
          recipe.ingredientes.map((ingrediente) => (
            <li key={ingrediente._id}>
              {ingrediente.nombre || "Nombre no disponible"}
            </li>
          ))
        ) : (
          <li>No hay ingredientes listados</li>
        )}
      </ul>

      <h3>Elaboración:</h3>
      <p>{recipe.elaboracion}</p>
    </div>
  );
}

export default OtherRecipesDetails;
