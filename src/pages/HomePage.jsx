import { Link } from "react-router-dom";
import RecipesPage from "./RecipesPage";
function HomePage() {
  return (
    <>
      <div>
        <h1>GlucoChef</h1>
        <h2>Come saludable, controla tu diabetes y disfruta de cocinar.</h2>
        <h4>Accede a recetas personalizadas y crea tu propio recetario.</h4>
      </div>
      <div>
        <h3>Recetas adaptadas</h3>
        <h5>Platos con hidratos controlados y clasificados</h5>
        <h3>Tu recetario personal</h3>
        <h5>Crea y comparte tus propias recetas</h5>
        <h3>Personaliza</h3>
        <h5>Edita o elimina tus recetas siempre que quieras</h5>
      </div>

      <div>
        <h3>Mis recetas: </h3>
        <Link to={"/recipes/myrecipes"}>
          <button>Ver todo</button>
        </Link>
      </div>

      <div>
        <h3>Otras recetas: </h3>
        <Link to={"/recipes"}>
          <button>Ver todo</button>
        </Link>
      </div>
      <div>{/*poner 3 recetas en vista previa(imagen, nombre) */}</div>
    </>
  );
}

export default HomePage;
