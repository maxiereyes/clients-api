import React from "react";
import { Link } from "react-router-dom";
import clienteAxios from "../../config/axios";
import Swal from "sweetalert2";

const Producto = ({ producto }) => {
  const eliminarProducto = (id) => {
    Swal.fire({
      title: "Estas seguro?",
      text: "Un producto eliminado no se puede recuperar",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.value) {
        clienteAxios.delete(`/productos/${id}`).then((res) => {
          Swal.fire("Eliminado", res.data.mensaje, "success");
        });
      }
    });
  };

  return (
    <li className="producto">
      <div className="info-producto">
        <p className="nombre">{producto.nombre}</p>
        <p className="precio">${producto.precio}</p>
        {producto.imagen ? (
          <div style={{ width: "30%" }}>
            <img
              src={`${process.env.REACT_APP_BACKEND_URL}/${producto.imagen}`}
              alt={producto.nombre}
              style={{ width: "100%" }}
            />
          </div>
        ) : null}
      </div>
      <div className="acciones">
        <Link to={`/productos/editar/${producto._id}`} className="btn btn-azul">
          <i className="fas fa-pen-alt"></i>
          Editar Producto
        </Link>
        <button
          type="button"
          className="btn btn-rojo btn-eliminar"
          onClick={() => eliminarProducto(producto._id)}
        >
          <i className="fas fa-times"></i>
          Eliminar Producto
        </button>
      </div>
    </li>
  );
};

export default Producto;
