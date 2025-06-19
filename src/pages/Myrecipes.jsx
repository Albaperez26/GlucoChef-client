import { useEffect, useState } from "react";
import service from "../services/service.config";
import { Link, useParams } from "react-router-dom";

//pagina donde ver las recetas del usuario en especifico(MIS RECETAS)
function Myrecipes() {
  const [myRecipes, setMyRecipes] = useState([]);

  useEffect(() => {
    const getMyRecipes = async () => {
      try {
        const response = await service.get("/recipes/myrecipes");
        setMyRecipes(response.data);
      } catch (error) {
        console.log("Error en la pagina de recetas", error);
        navigate("/error");
      }
    };
    getMyRecipes();
  }, []);

  return (
    <div>
      <h1>Aqui van MIS recetas</h1>
      <Link to="/recipes/create">
        <button>Crear nueva receta</button>
      </Link>

      <Link to="/">
        <button>←Volver atrás</button>
      </Link>

      {myRecipes.map((recipe) => (
        <Link to={`/recipes/myrecipes/${recipe._id}`} key={recipe._id}>
          <div>
            <h3>{recipe.titulo}</h3>
            <img
              src={recipe.photoURL}
              alt="img galleta"
              style={{
                maxWidth: "300px",
                maxHeight: "200px",
                objectFit: "s",
              }}
            />
            <p>{recipe.elaboracion}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default Myrecipes;
