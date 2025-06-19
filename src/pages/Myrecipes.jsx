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
    <div className="container my-5">
      <h1 className="text-primary fw-bold mb-4 text-center">Mis Recetas</h1>

      <div className="d-flex justify-content-center gap-3 mb-4 flex-wrap">
        <Link to="/recipes/create" className="btn btn-success">
          Crear nueva receta
        </Link>

        <Link to="/" className="btn btn-secondary">
          ← Volver atrás
        </Link>
      </div>

      {myRecipes.length === 0 ? (
        <p className="text-center text-muted">No tienes recetas aún.</p>
      ) : (
        <div className="row g-4">
          {myRecipes.map((recipe) => (
            <div className="col-12 col-md-6" key={recipe._id}>
              <Link
                to={`/recipes/myrecipes/${recipe._id}`}
                className="text-decoration-none text-dark"
              >
                <div
                  className="card flex-row shadow-sm bg-light rounded overflow-hidden h-100 hover-shadow"
                  style={{ minHeight: "220px" }} // altura mínima fija
                >
                  <div
                    style={{
                      minWidth: "180px",
                      maxWidth: "220px",
                      overflow: "hidden",
                    }}
                  >
                    <img
                      src={recipe.photoURL}
                      alt=""
                      className="img-fluid h-100"
                      style={{
                        objectFit: "contain",
                        height: "180px",
                        width: "100%",
                      }}
                    />
                  </div>
                  <div className="card-body d-flex flex-column justify-content-center">
                    <h2 className="card-title text-truncate">
                      {recipe.titulo}
                    </h2>
                    <p
                      className="card-text"
                      style={{
                        maxHeight: "4.5em",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
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
    </div>
  );
}

export default Myrecipes;
