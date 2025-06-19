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
    <div className="container my-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-center mb-4 text-primary fw-bold">
          Explora Recetas
        </h2>
        <Link to="/recipes/create" className="btn btn-success ms-3">
          Crear Receta
        </Link>
      </div>

      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Buscar receta por nombre..."
          value={recipeName}
          onChange={handleRecipe}
        />
      </div>

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {recipes.map((recipe) => (
          <div key={recipe._id} className="col">
            <Link
              to={`/recipes/${recipe._id}`}
              className="text-decoration-none text-dark"
            >
              <div className="card h-100 shadow-sm">
                <img
                  src={recipe.photoURL}
                  className="card-img-top"
                  alt={recipe.titulo}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{recipe.titulo}</h5>
                  <p className="card-text text-truncate">
                    {recipe.elaboracion}
                  </p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      <div className="text-center mt-5">
        <Link to="/" className="btn btn-secondary">
          ← Volver al inicio
        </Link>
      </div>
    </div>
  );
}
export default RecipesPage;
