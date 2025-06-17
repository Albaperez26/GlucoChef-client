import { AuthContext } from "../context/auth.context";
import service from "../services/service.config";
import { useContext, useEffect, useState } from "react";

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
    }
  };

  if (role !== "admin") {
    return <p>Acceso denegado. Esta página es solo para administradores.</p>;
  }

  return (
    <div>
      {role === "admin" && (
        <div>
          <h3>Página de todos los ingredientes</h3>
          <p>
            Solo usuarios que sean admin deberian poder acceder y ver la
            siguiente información:
          </p>
          <ul>
            {ingredients.map((ingredient) => (
              <li key={ingredient._id}>
                <p>
                  {ingredient.nombre} - {ingredient.establecimiento}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default IngredientsPage;
