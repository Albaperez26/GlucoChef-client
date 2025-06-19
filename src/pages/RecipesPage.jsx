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
      console.log(response.data);
      setRecipes(response.data);
    } catch (error) {
      console.log("Error en la pagina de todas las recetas", error);
      navigate("/error");
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

      <Link to="/">
        <button>←Volver atrás</button>
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
        <Link to={`/recipes/${recipe._id}`} key={recipe._id}>
          <div>
            <h3>{recipe.titulo}</h3>
            <img
              src={recipe.photoURL}
              alt="img de la receta"
              style={{
                maxWidth: "300px",
                maxHeight: "200px",
                objectFit: "contain",
              }}
            />
            <p>{recipe.elaboracion}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
export default RecipesPage;
