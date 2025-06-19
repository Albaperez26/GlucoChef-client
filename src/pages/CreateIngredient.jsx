import { useState } from "react";
import { useNavigate } from "react-router-dom";
import service from "../services/service.config";
import { Link } from "react-router-dom";

function CreateIngredients() {
  const navigate = useNavigate();

  const [createForm, setCreateForm] = useState({
    nombre: "",
    establecimiento: "",
    hidratos: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCreateForm({ ...createForm, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await service.post("/ingredients/create", createForm);
      navigate("/ingredients");
    } catch (error) {
      console.log("Error creando el ingrediente", error);
      navigate("/error");
    }
  };

  return (
    <div>
      <h2>Crear Ingrediente</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={createForm.nombre}
          onChange={handleChange}
        />

        <input
          type="text"
          name="establecimiento"
          placeholder="Establecimiento"
          value={createForm.establecimiento}
          onChange={handleChange}
        />

        <input
          type="number"
          name="hidratos"
          placeholder="Hidratos"
          value={createForm.hidratos}
          onChange={handleChange}
        />

        <button onClick={handleSubmit}>Crear Ingrediente</button>
      </form>
      <Link to="/ingredients">
        <button>←Volver atrás</button>
      </Link>
    </div>
  );
}

export default CreateIngredients;
