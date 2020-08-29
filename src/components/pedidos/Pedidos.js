import React, { Fragment, useEffect, useState } from "react";
import clienteAxios from "../../config/axios";
import Pedido from "./Pedido";

const Pedidos = () => {
  const [pedidos, guardarPedidos] = useState([]);

  useEffect(() => {
    const consultarApi = async () => {
      const res = await clienteAxios.get("/pedidos");
      guardarPedidos(res.data);
    };

    consultarApi();
  }, [pedidos]);

  return (
    <Fragment>
      <h2>Pedidos</h2>

      <ul className="listado-pedidos">
        {pedidos.map((pedido) => (
          <Pedido key={pedido._id} pedido={pedido} />
        ))}
      </ul>
    </Fragment>
  );
};

export default Pedidos;
