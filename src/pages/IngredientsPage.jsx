import { AuthContext } from "../context/auth.context";
import service from "../services/service.config";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
function IngredientsPage() {
  const { role } = useContext(AuthContext);
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    getIngredients();
  }, []);

  const getIngredients = async () => {
    try {
      const response = await service.get(`/ingredients`);
      setIngredients(response.data);

      console.log(response);
    } catch (error) {
      console.log("Error al ver los ingredientes", error);
      navigate("/error");
    }
  };

  if (role !== "admin") {
    return <p>Acceso denegado. Esta página es solo para administradores.</p>;
  }

  return (
    <div>
      <div>
        <Link to="/ingredients/create">
          <button>Crear nuevo ingrediente</button>
        </Link>
        <h3>Lista de ingredientes:</h3>

        <ul>
          {ingredients.map((ingredient) => (
            <li key={ingredient._id}>
              <Link to={`/ingredients/${ingredient._id}`}>
                <p>
                  {ingredient.nombre} - {ingredient.establecimiento}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <Link to="/">
        <button>←Volver atrás</button>
      </Link>
    </div>
  );
}

export default IngredientsPage;
