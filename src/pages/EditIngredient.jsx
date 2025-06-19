import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import { useNavigate, useParams } from "react-router-dom";
import service from "../services/service.config";
import { Link } from "react-router-dom";

function EditIngredient() {
  const { role } = useContext(AuthContext);
  const { ingredientsId } = useParams();
  const navigate = useNavigate();

  const [editForm, setEditForm] = useState({
    nombre: "",
    establecimiento: "",
    hidratos: "",
  });

  useEffect(() => {
    const getIngredient = async () => {
      try {
        const response = await service.get(`/ingredients/${ingredientsId}`);
        setEditForm(response.data);
      } catch (error) {
        console.log("Error al obtener ingrediente", error);
      }
    };
    getIngredient();
  }, [ingredientsId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditForm((latest) => ({ ...latest, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await service.put(`/ingredients/${ingredientsId}`, editForm);
      navigate("/ingredients");
    } catch (error) {
      console.log("Error al editar el ingrediente", error);
    }
  };

  if (role !== "admin") {
    return <p>Acceso denegado. Esta página es solo para administradores.</p>;
  }
  //console.log(editForm);

  const deleteIngrediente = async () => {
    const confirmDelete = window.confirm(
      "¿Estás seguro que deseas borrar el ingrediente?"
    );
    if (!confirmDelete) return;
    try {
      await service.delete(`/ingredients/${ingredientsId}`);
      navigate("/ingredients");
    } catch (error) {
      console.log("Error al eliminar el ingrediente", error);
      //poner navigate a la pag de error
    }
    if (role !== "admin") {
      return (
        <p className="text-danger text-center mt-5">
          Acceso denegado. Esta página es solo para administradores.
        </p>
      );
    }
  };
  return (
    <div className="container my-5">
      <h2 className="text-primary fw-bold mb-4">Editar Ingrediente</h2>

      <form onSubmit={handleSubmit} className="card shadow-sm p-4">
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input
            type="text"
            className="form-control"
            name="nombre"
            value={editForm.nombre || ""}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Establecimiento</label>
          <input
            type="text"
            className="form-control"
            name="establecimiento"
            value={editForm.establecimiento || ""}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <label className="form-label">Hidratos</label>
          <input
            type="number"
            className="form-control"
            name="hidratos"
            value={editForm.hidratos || ""}
            onChange={handleChange}
            required
          />
        </div>

        <div className="d-flex flex-wrap justify-content-between gap-2">
          <button type="submit" className="btn btn-primary">
            Guardar cambios
          </button>

          <button
            type="button"
            className="btn btn-danger"
            onClick={deleteIngrediente}
          >
            Eliminar ingrediente
          </button>

          <Link to="/ingredients" className="btn btn-secondary">
            ← Volver atrás
          </Link>
        </div>
      </form>
    </div>
  );
}

export default EditIngredient;
