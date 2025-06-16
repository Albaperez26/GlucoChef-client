import "./App.css";
import { Routes, Route } from "react-router";

//pages
import HomePage from "./pages/HomePage";
import Login from "./pages/auth/Login";
import IngredientsPage from "./pages/IngredientsPage";
//components
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import OnlyPrivate from "./components/OnlyPrivate";
import AdminPage from "./pages/AdminPage";
import Signup from "./pages/auth/SignUp";
import OnlyAdmin from "./components/OnlyAdmin";
import RecipesPage from "./pages/RecipesPage";
import Myrecipes from "./pages/Myrecipes";
import EditRecipes from "./pages/EditRecipes";

function App() {
  return (
    <>
      <NavBar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/ingredients"
          element={
            <OnlyPrivate>
              <IngredientsPage />
            </OnlyPrivate>
          }
        />
        <Route
          path="/recipes"
          element={
            <OnlyPrivate>
              <RecipesPage />
            </OnlyPrivate>
          }
        />
        <Route
          path="/recipes/myrecipes"
          element={
            <OnlyPrivate>
              <Myrecipes />
            </OnlyPrivate>
          }
        />
        <Route
          path="/recipes/myrecipes/:recipesId"
          element={
            <OnlyPrivate>
              <EditRecipes />
            </OnlyPrivate>
          }
        />
        <Route
          path="/admin"
          element={
            <OnlyAdmin>
              <AdminPage />
            </OnlyAdmin>
          }
        />
        {/*Rutas de error aqui */}
      </Routes>

      <Footer />
    </>
  );
}

export default App;
