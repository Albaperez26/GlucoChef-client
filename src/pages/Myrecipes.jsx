import { useEffect, useState } from "react";
import service from "../services/service.config";

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
      }
    };
    getMyRecipes();
  }, []);

  return (
    <div>
      <h1>Aqui van MIS recetas</h1>
      {myRecipes.map((recipe) => (
        <div key={recipe._id}>
          <h3>{recipe.titulo}</h3>
          <img src={recipe.photoURL} alt="img galleta" />
          <p>{recipe.elaboracion}</p>
        </div>
      ))}
    </div>
  );
}

export default Myrecipes;
