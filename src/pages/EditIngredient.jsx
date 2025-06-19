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
    try {
      await service.delete(`/ingredients/${ingredientsId}`);
      navigate("/ingredients");
    } catch (error) {
      console.log("Error al eliminar el ingrediente", error);
      //poner navigate a la pag de error
    }
  };
  return (
    <div>
      <h3>Editar Ingrediente</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input
            type="text"
            name="nombre"
            value={editForm.nombre || ""}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Establecimiento:
          <input
            type="text"
            name="establecimiento"
            value={editForm.establecimiento || ""}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Hidratos:
          <input
            type="number"
            name="hidratos"
            value={editForm.hidratos || ""}
            onChange={handleChange}
            required
          />
        </label>

        <button type="button" onClick={handleSubmit}>
          Guardar cambios
        </button>
        <button onClick={deleteIngrediente}>Eliminar Ingrediente</button>
      </form>
      <Link to="/ingredients">
        <button>←Volver atrás</button>
      </Link>
    </div>
  );
}

export default EditIngredient;
