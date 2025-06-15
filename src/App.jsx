import "./App.css";
import { Routes, Route } from "react-router";

//pages
import HomePage from "./pages/HomePage";
import Signup from "./pages/auth/Signup";
import Login from "./pages/auth/Login";
import IngredientsPage from "./pages/IngredientsPage";
//components
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import OnlyPrivate from "./components/OnlyPrivate";

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

        {/*Rutas de error aqui */}
      </Routes>

      <Footer />
    </>
  );
}

export default App;
