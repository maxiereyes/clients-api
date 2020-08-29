import React, { Fragment, useEffect, useState } from "react";
import clienteAxios from "../../config/axios";
import FormBuscarProductos from "./FormBuscarProductos";
import Swal from "sweetalert2";
import FormCantidadProducto from "./FormCantidadProducto";
import { withRouter } from "react-router-dom";

const NuevoPedido = (props) => {
  const { id } = props.match.params;
  const [cliente, guardarCliente] = useState({});
  const [busqueda, guardarBusqueda] = useState("");
  const [productos, guardarProductos] = useState([]);
  const [total, guardarTotal] = useState(0);

  useEffect(() => {
    const consultarApi = async () => {
      const clienteConsulta = await clienteAxios.get(`/clientes/${id}`);
      guardarCliente(clienteConsulta.data);
    };

    consultarApi();

    sumarTotalPagar();
    // eslint-disable-next-line
  }, [productos]);

  const buscarProducto = async (e) => {
    e.preventDefault();

    const resultadoBusqueda = await clienteAxios.post(
      `/productos/busqueda/${busqueda}`
    );

    if (resultadoBusqueda.data[0]) {
      let productoResultado = resultadoBusqueda.data[0];

      productoResultado.producto = resultadoBusqueda.data[0]._id;
      productoResultado.cantidad = 0;

      guardarProductos([...productos, productoResultado]);
    } else {
      Swal.fire({
        icon: "error",
        title: "Resultados",
        text: "No hay resultados",
      });
    }
  };

  const leerDatosBusqueda = (e) => {
    guardarBusqueda(e.target.value);
  };

  const sumarCantidad = (index) => {
    const todosProductos = [...productos];

    todosProductos[index].cantidad++;

    guardarProductos(todosProductos);
  };

  const restarCantidad = (index) => {
    const todosProductos = [...productos];

    if (todosProductos[index].cantidad === 0) return;

    todosProductos[index].cantidad--;

    guardarProductos(todosProductos);
  };

  const sumarTotalPagar = () => {
    if (productos.length === 0) {
      guardarTotal(0);
      return;
    }

    let nuevoTotal = 0;

    productos.map(
      (producto) => (nuevoTotal += producto.cantidad * producto.precio)
    );

    guardarTotal(nuevoTotal);
  };

  const eliminarProductoPedido = (id) => {
    const todosProductos = productos.filter(
      (producto) => producto.producto !== id
    );

    guardarProductos(todosProductos);
  };

  const realizarPedido = async (e) => {
    e.preventDefault();

    const { id } = props.match.params;

    const pedido = {
      cliente: id,
      pedidos: productos,
      total,
    };

    const resultado = await clienteAxios.post(`/pedidos`, pedido);

    if (resultado.status === 200) {
      Swal.fire({
        icon: "success",
        title: "Correcto",
        text: resultado.data.mensaje,
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Hubo un error",
        text: "Vuelva a intentarlo mas tarde",
      });
    }

    props.history.push("/pedidos");
  };

  return (
    <Fragment>
      <h2>Nuevo Pedido</h2>

      <div className="ficha-cliente">
        <h3>Datos del Cliente</h3>
        <p>
          Nombre: {cliente.nombre} {cliente.apellido}
        </p>
        <p>Telefono: {cliente.telefono}</p>
      </div>

      <FormBuscarProductos
        buscarProducto={buscarProducto}
        leerDatosBusqueda={leerDatosBusqueda}
      />

      <ul className="resumen">
        {productos.map((producto, index) => (
          <FormCantidadProducto
            key={producto.producto}
            producto={producto}
            incrementarCantidad={() => sumarCantidad(index)}
            decrementarCantidad={() => restarCantidad(index)}
            eliminarProductoPedido={eliminarProductoPedido}
          />
        ))}
      </ul>

      <p className="total">
        Total: <span>$ {total}</span>
      </p>

      {total > 0 ? (
        <form onSubmit={realizarPedido}>
          <input
            type="submit"
            className="btn btn-verde btn-block"
            value="Realizar Pedido"
          />
        </form>
      ) : null}
    </Fragment>
  );
};

export default withRouter(NuevoPedido);
