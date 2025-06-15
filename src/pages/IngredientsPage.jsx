import { AuthContext } from "../context/auth.context";
import service from "../services/service.config";
import { useContext, useEffect, useState } from "react";

function IngredientsPage() {
  const { role } = useContext(AuthContext);

  const [dataOnlyForLoggedUsers, setData] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await service.get(`/ingredients`);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  // loading handler here

  return (
    <div>
      {role === "admin" && (
        <>
          <h3>Ejemplo de página privada</h3>
          <p>
            Solo usuarios que hayan validado credenciales deberian poder acceder
            y ver la siguiente información:
          </p>
        </>
      )}
    </div>
  );
}

export default IngredientsPage;
