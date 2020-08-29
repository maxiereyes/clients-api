import React, { Fragment, useState, useEffect } from "react";
import clienteAxios from "../../config/axios";
import Swal from "sweetalert2";

const EditarCliente = (props) => {
  const { id } = props.match.params;

  const [cliente, datosCliente] = useState({
    nombre: "",
    apellido: "",
    empresa: "",
    email: "",
    telefono: "",
  });

  const consultarClienteApi = async () => {
    const clienteConsulta = await clienteAxios.get(`/clientes/${id}`);

    datosCliente(clienteConsulta.data);
  };

  useEffect(() => {
    consultarClienteApi();
    // eslint-disable-next-line
  }, []);

  const actualizarState = (e) => {
    datosCliente({
      ...cliente,
      [e.target.name]: e.target.value,
    });
  };

  const validarCliente = () => {
    const { nombre, apellido, empresa, email, telefono } = cliente;

    let valido =
      !nombre.length ||
      !apellido.length ||
      !empresa.length ||
      !email.length ||
      !telefono.length;

    return valido;
  };

  const actualizarCliente = (e) => {
    e.preventDefault();

    clienteAxios
      .put(`/clientes/${cliente._id}`, cliente)
      .then((res) => {
        if (res.data.code !== 0) {
          console.log(res.data);
          Swal.fire({
            icon: "error",
            title: "Hubo un error",
            text: "Ese cliente ya esta registrado",
          });
        } else {
          console.log(res);
          Swal.fire("CORRECTO", "Se actualizo correctamente", "success");
          props.history.push("/");
        }
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Hubo un error",
          text: error.message,
        });
      });
  };

  return (
    <Fragment>
      <h2>Editar Cliente</h2>
      <form onSubmit={actualizarCliente}>
        <legend>Llena todos los campos</legend>
        <div className="campo">
          <label>Nombre:</label>
          <input
            type="text"
            placeholder="Nombre Cliente"
            name="nombre"
            onChange={actualizarState}
            value={cliente.nombre}
          />
        </div>
        <div className="campo">
          <label>Apellido:</label>
          <input
            type="text"
            placeholder="Apellido Cliente"
            name="apellido"
            onChange={actualizarState}
            value={cliente.apellido}
          />
        </div>
        <div className="campo">
          <label>Empresa:</label>
          <input
            type="text"
            placeholder="Empresa Cliente"
            name="empresa"
            onChange={actualizarState}
            value={cliente.empresa}
          />
        </div>
        <div className="campo">
          <label>Email:</label>
          <input
            type="email"
            placeholder="Email Cliente"
            name="email"
            onChange={actualizarState}
            value={cliente.email}
          />
        </div>
        <div className="campo">
          <label>Telefono:</label>
          <input
            type="text"
            placeholder="Telefono Cliente"
            name="telefono"
            onChange={actualizarState}
            value={cliente.telefono}
          />
        </div>
        <div className="enviar">
          <input
            type="submit"
            className="btn btn-azul"
            value="Guardar Cambios"
            disabled={validarCliente()}
          />
        </div>
      </form>
    </Fragment>
  );
};

export default EditarCliente;
