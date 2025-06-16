import { useEffect, useState } from "react";
import service from "../services/service.config";

//aqui se ven TODAS las recetas
function RecipesPage() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const getRecipes = async () => {
      try {
        const response = await service.get("/recipes");
        setRecipes(response.data);
      } catch (error) {
        console.log("Error en la pagina de todas las recetas", error);
      }
    };
    getRecipes();
  }, []);
  return (
    <div>
      <h2>Esta es la página de TODAS las recetas</h2>
      {recipes.map((recipe) => (
        <div key={recipe._id}>
          <h3>{recipe.titulo}</h3>
          <img src={recipe.photoURL} alt="img de la receta" />
          <p>{recipe.elaboracion}</p>
        </div>
      ))}
    </div>
  );
}
export default RecipesPage;
