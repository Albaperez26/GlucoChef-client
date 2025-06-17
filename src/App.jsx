import "./App.css";
import { Routes, Route } from "react-router";

//pages
import HomePage from "./pages/HomePage";
import Login from "./pages/auth/Login";
import IngredientsPage from "./pages/IngredientsPage";
import RecipesPage from "./pages/RecipesPage";
import Myrecipes from "./pages/Myrecipes";
import EditRecipes from "./pages/EditRecipes";
import CreateRecipes from "./pages/CreateRecipes";
import UserPage from "./pages/Userpage";
import Signup from "./pages/auth/SignUp";
import EditUser from "./pages/EditUser";
import EditIngredient from "./pages/EditIngredient";
import CreateIngredients from "./pages/CreateIngredient";
//components
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import OnlyPrivate from "./components/OnlyPrivate";
import OnlyAdmin from "./components/OnlyAdmin";

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
            <OnlyAdmin>
              <IngredientsPage />
            </OnlyAdmin>
          }
        />
        <Route
          path="/ingredients/:ingredientsId"
          element={
            <OnlyAdmin>
              <EditIngredient />
            </OnlyAdmin>
          }
        />
        <Route
          path="/ingredients/create"
          element={
            <OnlyAdmin>
              <CreateIngredients />
            </OnlyAdmin>
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
          path="/recipes/create"
          element={
            <OnlyPrivate>
              <CreateRecipes />
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
          path="/user/:userId"
          element={
            <OnlyPrivate>
              <UserPage />
            </OnlyPrivate>
          }
        />
        <Route
          path="/user/:userId/edit"
          element={
            <OnlyPrivate>
              <EditUser />
            </OnlyPrivate>
          }
        />

        {/*Rutas de error aqui */}
      </Routes>

      <Footer />
    </>
  );
}

export default App;
