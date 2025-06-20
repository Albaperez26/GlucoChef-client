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
    <div className="container my-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-center mb-4 text-primary fw-bold">Mis Recetas</h2>
        <Link to="/recipes/create" className="btn btn-success ms-3">
          Crear Receta
        </Link>
      </div>

      {myRecipes.length === 0 ? (
        <p className="text-center text-muted">No tienes recetas aún.</p>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {myRecipes.map((recipe) => (
            <div key={recipe._id} className="col">
              <Link
                to={`/recipes/myrecipes/${recipe._id}`}
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
                    <p
                      className="card-text text-truncate"
                      title={recipe.elaboracion}
                    >
                      {recipe.elaboracion}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}

      <div className="text-center mt-5">
        <Link to="/" className="btn btn-secondary">
          ← Volver al inicio
        </Link>
      </div>
    </div>
  );
}

export default Myrecipes;
