import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import service from "../services/service.config";
import img1 from "../images/img1.png";
import img2 from "../images/img2.png";
import img3 from "../images/img3.png";
import logo from "../images/logo-glucochef.png";

function HomePage() {
  const [myRecipesPreview, setMyRecipesPreview] = useState([]);
  const [allRecipesPreview, setAllRecipesPreview] = useState([]);

  useEffect(() => {
    const getPreviewRecipes = async () => {
      try {
        const response = await service.get("/recipes/myrecipes");
        setMyRecipesPreview(response.data.slice(0, 3));
      } catch (error) {
        console.log("Error cargando recetas", error);
      }
    };
    const getPreviewAllRecipes = async () => {
      try {
        const response = await service.get("/recipes");
        setAllRecipesPreview(response.data.slice(0, 3));
      } catch (error) {
        console.log("Error cargando todas las recetas", error);
      }
    };

    getPreviewRecipes();
    getPreviewAllRecipes();
  }, []);

  return (
    <div className="container py-5">
      <img
        src={logo}
        alt="Logo, imagen gorro de cocina"
        className="img-fluid mb-3"
        style={{ maxWidth: "120px" }}
      />
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold text-primary">GlucoChef</h1>
        <h2 className="h5 text-muted">
          Come saludable, controla tu diabetes y disfruta de cocinar.
        </h2>
        <p className="lead">
          Accede a recetas personalizadas y crea tu propio recetario.
        </p>
      </div>

      <div className="row text-center mb-5 g-4">
        <div className="col-12 col-md-4">
          <img
            src={img1}
            alt="Icono contador de Carbohidratos"
            className="img-fluid mb-3"
            style={{ maxHeight: "100px", objectFit: "contain" }}
          />
          <h3 className="fw-bold">Recetas adaptadas</h3>
          <p>Platos con hidratos controlados y clasificados</p>
        </div>
        <div className="col-12 col-md-4">
          <img
            src={img2}
            alt="Icono recetas"
            className="img-fluid mb-3"
            style={{ maxHeight: "100px", objectFit: "contain" }}
          />
          <h3 className="fw-bold">Tu recetario personal</h3>
          <p>Crea y comparte tus propias recetas</p>
        </div>
        <div className="col-12 col-md-4">
          <img
            src={img3}
            alt="Icono recetas personalizadas"
            className="img-fluid mb-3"
            style={{ maxHeight: "100px", objectFit: "contain" }}
          />
          <h3 className="fw-bold">Personaliza</h3>
          <p>Edita o elimina tus recetas siempre que quieras</p>
        </div>
      </div>

      <div className="mb-5">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3 className="fw-bold">Mis recetas</h3>
          <Link to="/recipes/myrecipes" className="btn btn-outline-primary">
            Ver todas
          </Link>
        </div>
        <div className="row g-4">
          {myRecipesPreview.map((recipe) => (
            <div className="col-12 col-md-4" key={recipe._id}>
              <Link
                to={`/recipes/myrecipes/${recipe._id}`}
                className="text-decoration-none text-dark w-100"
              >
                <div className="card flex-column flex-md-row shadow-sm bg-light rounded overflow-hidden h-100">
                  <div
                    className="d-flex justify-content-center justify-content-md-start align-items-center mx-auto mx-md-0"
                    style={{
                      width: "100%",
                      maxWidth: "200px",
                      minWidth: "180px",
                      height: "180px",
                    }}
                  >
                    <img
                      src={recipe.photoURL}
                      alt={recipe.titulo}
                      className="img-fluid"
                      style={{
                        objectFit: "contain",
                        height: "180px",
                        width: "100%",
                        padding: "10px",
                      }}
                    />
                  </div>
                  <div className="card-body d-flex flex-column justify-content-center flex-grow-1 min-width-0">
                    <h5 className="card-title">{recipe.titulo}</h5>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* OTRAS RECETAS */}
      <div className="mb-5">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3 className="fw-bold">Otras recetas</h3>
          <Link to="/recipes" className="btn btn-outline-primary">
            Ver todas
          </Link>
        </div>
        <div className="row g-4">
          {allRecipesPreview.map((recipe) => (
            <div className="col-12 col-md-4" key={recipe._id}>
              <Link
                to={`/recipes/${recipe._id}`}
                className="text-decoration-none text-dark w-100"
              >
                <div className="card flex-column flex-md-row shadow-sm bg-light rounded overflow-hidden h-100">
                  <div
                    className="d-flex justify-content-center justify-content-md-start align-items-center mx-auto mx-md-0"
                    style={{
                      width: "100%",
                      maxWidth: "200px",
                      minWidth: "180px",
                      height: "180px",
                    }}
                  >
                    <img
                      src={recipe.photoURL}
                      alt={recipe.titulo}
                      className="img-fluid"
                      style={{
                        objectFit: "contain",
                        height: "180px",
                        width: "100%",
                        padding: "10px",
                      }}
                    />
                  </div>
                  <div className="card-body d-flex flex-column justify-content-center flex-grow-1 min-width-0">
                    <h5 className="card-title">{recipe.titulo}</h5>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
