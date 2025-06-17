import { useEffect, useState } from "react";
import service from "../services/service.config";
import { Link } from "react-router-dom";

//aqui se ven TODAS las recetas
function RecipesPage() {
  const [recipes, setRecipes] = useState([]);
  const [recipeName, setRecipeName] = useState("");

  useEffect(() => {
    //useEffect hace que se ejecute getrecipes nada mas abrir la pag
    getRecipes();
  }, [recipeName]);

  const getRecipes = async () => {
    try {
      const response = await service.get(`/recipes?q=${recipeName}`);
      setRecipes(response.data);
    } catch (error) {
      console.log("Error en la pagina de todas las recetas", error);
    }
  };
  const handleRecipe = (e) => {
    setRecipeName(e.target.value);
  };
  return (
    <div>
      <h2>Esta es la página de TODAS las recetas</h2>

      <Link to="/recipes/create">
        <button>Crear nueva receta</button>
      </Link>

      <div className="buscador-home-page">
        <input
          className="buscador-style"
          type="text"
          placeholder="Buscar receta..."
          onChange={handleRecipe}
        />
      </div>
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
