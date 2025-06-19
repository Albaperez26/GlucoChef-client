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
    <div className="container my-5">
      <h2 className="text-primary fw-bold mb-4">Crear Ingrediente</h2>

      <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input
            type="text"
            name="nombre"
            className="form-control"
            placeholder="Ej: Pan integral"
            value={createForm.nombre}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Establecimiento</label>
          <input
            type="text"
            name="establecimiento"
            className="form-control"
            placeholder="Ej: Mercadona"
            value={createForm.establecimiento}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <label className="form-label">Hidratos</label>
          <input
            type="number"
            name="hidratos"
            className="form-control"
            placeholder="Ej: 45"
            value={createForm.hidratos}
            onChange={handleChange}
            required
          />
        </div>

        <div className="d-flex justify-content-center gap-3 flex-wrap">
          <button type="submit" className="btn btn-success">
            Crear Ingrediente
          </button>

          <Link to="/ingredients" className="btn btn-secondary">
            ← Volver atrás
          </Link>
        </div>
      </form>
    </div>
  );
}

export default CreateIngredients;
