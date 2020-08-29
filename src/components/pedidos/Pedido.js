import React, { Fragment } from "react";
import clienteAxios from "../../config/axios";
import Swal from "sweetalert2";

const Pedido = ({ pedido }) => {
  const { _id, cliente, pedidos, total } = pedido;

  const eliminarPedido = async (id) => {
    Swal.fire({
      title: "Estas seguro?",
      text: "Un pedido eliminado no se puede recuperar",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.value) {
        clienteAxios.delete(`/pedidos/${id}`).then((res) => {
          Swal.fire("Eliminado", res.data.mensaje, "success");
        });
      }
    });
  };

  return (
    <Fragment>
      <li className="pedido">
        <div className="info-pedido">
          <p className="id">ID: {_id}</p>
          <p className="nombre">
            Cliente: {cliente.nombre} {cliente.apellido}
          </p>

          <div className="articulos-pedido">
            <p className="productos">Artículos Pedido: </p>
            <ul>
              {pedidos.map((pedido) => (
                <li key={pedidos._id + pedido.producto._id}>
                  <p>{pedido.producto.nombre}</p>
                  <p>Precio: $ {pedido.producto.precio}</p>
                  <p>Cantidad: {pedido.cantidad}</p>
                </li>
              ))}
            </ul>
          </div>
          <p className="total">Total: $ {total} </p>
        </div>
        <div className="acciones">
          <button
            type="button"
            className="btn btn-rojo btn-eliminar"
            onClick={() => eliminarPedido(_id)}
          >
            <i className="fas fa-times"></i>
            Eliminar Pedido
          </button>
        </div>
      </li>
    </Fragment>
  );
};

export default Pedido;
