import React, { Fragment, useState } from "react";
import clienteAxios from "../../config/axios";
import Swal from "sweetalert2";
import { withRouter } from "react-router-dom";

const NuevoCliente = ({ history }) => {
  const [cliente, guardarCliente] = useState({
    nombre: "",
    apellido: "",
    empresa: "",
    email: "",
    telefono: "",
  });

  const actualizarState = (e) => {
    guardarCliente({
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

  const agregarCliente = async (e) => {
    e.preventDefault();

    clienteAxios.post("/clientes", cliente).then((res) => {
      if (res.data.code === 11000) {
        Swal.fire({
          icon: "error",
          title: "Hubo un error",
          text: "Ese cliente ya esta registrado",
        });
      } else {
        Swal.fire("Se agrego el cliente", res.data.mensaje, "success");
        history.push("/");
      }
    });
  };

  return (
    <Fragment>
      <h2>Nuevo Cliente</h2>
      <form onSubmit={agregarCliente}>
        <legend>Llena todos los campos</legend>
        <div className="campo">
          <label>Nombre:</label>
          <input
            type="text"
            placeholder="Nombre Cliente"
            name="nombre"
            onChange={actualizarState}
          />
        </div>
        <div className="campo">
          <label>Apellido:</label>
          <input
            type="text"
            placeholder="Apellido Cliente"
            name="apellido"
            onChange={actualizarState}
          />
        </div>
        <div className="campo">
          <label>Empresa:</label>
          <input
            type="text"
            placeholder="Empresa Cliente"
            name="empresa"
            onChange={actualizarState}
          />
        </div>
        <div className="campo">
          <label>Email:</label>
          <input
            type="email"
            placeholder="Email Cliente"
            name="email"
            onChange={actualizarState}
          />
        </div>
        <div className="campo">
          <label>Telefono:</label>
          <input
            type="text"
            placeholder="Telefono Cliente"
            name="telefono"
            onChange={actualizarState}
          />
        </div>
        <div className="enviar">
          <input
            type="submit"
            className="btn btn-azul"
            value="Agregar Cliente"
            disabled={validarCliente()}
          />
        </div>
      </form>
    </Fragment>
  );
};

// HOC, es una funcion que toma un componente y retorna un nuevo componente
export default withRouter(NuevoCliente);
