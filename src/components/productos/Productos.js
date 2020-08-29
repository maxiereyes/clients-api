import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Producto from "./Producto";
import clienteAxios from "../../config/axios";

const Productos = () => {
  const [productos, guardarProductos] = useState([]);

  useEffect(() => {
    const consultarApi = async () => {
      const productosConsulta = await clienteAxios.get("/productos");

      guardarProductos(productosConsulta.data);
    };

    consultarApi();
  }, [productos]);

  return (
    <Fragment>
      <h2>Productos</h2>
      <Link to={"/productos/nuevo"} className="btn btn-verde nvo-cliente">
        <i className="fas fa-plus-circle"></i>
        Nuevo Producto
      </Link>

      <ul className="listado-productos">
        {productos.map((producto) => (
          <Producto key={producto._id} producto={producto} />
        ))}
      </ul>
    </Fragment>
  );
};

export default Productos;
