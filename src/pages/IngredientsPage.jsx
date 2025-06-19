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
    return (
      <div className="container text-center my-5">
        <h3 className="text-danger">Acceso denegado</h3>
        <p>Esta página es solo para administradores.</p>
        <Link to="/" className="btn btn-outline-secondary mt-3">
          ← Volver al inicio
        </Link>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold text-primary">Lista de ingredientes</h2>
        <Link to="/ingredients/create" className="btn btn-outline-secondary">
          + Crear ingrediente
        </Link>
      </div>

      <ul className="list-unstyled">
        {ingredients.map((ingredient) => (
          <li key={ingredient._id} className="mb-3">
            <Link
              to={`/ingredients/${ingredient._id}`}
              className="text-decoration-none"
            >
              <div className="card p-3 bg-light rounded shadow-sm ingredient-card">
                <h5 className="mb-1 fw-semibold">{ingredient.nombre}</h5>
                <p className="text-muted mb-0">{ingredient.establecimiento}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      <div className="text-center mt-5">
        <Link to="/" className="btn btn-outline-primary">
          ← Volver atrás
        </Link>
      </div>
    </div>
  );
}

export default IngredientsPage;
