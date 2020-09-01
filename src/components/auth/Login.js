import React, { useState, useContext } from "react";
import Swal from "sweetalert2";
import clienteAxios from "../../config/axios";
import { withRouter } from "react-router-dom";

import { CRMContext } from "../../context/CRMContext";

const Login = (props) => {
  const [credenciales, guardarCredenciales] = useState({
    email: "",
    password: "",
  });

  const [auth, guardarAuth] = useContext(CRMContext);

  const leerDatos = (e) => {
    guardarCredenciales({
      ...credenciales,
      [e.target.name]: e.target.value,
    });
  };

  const iniciarSesion = async (e) => {
    e.preventDefault();

    try {
      const respuesta = await clienteAxios.post(
        "/iniciar-sesion",
        credenciales
      );
      const { token } = respuesta.data;

      guardarAuth({
        token,
        auth: true,
      });

      Swal.fire("Login Correcto", "Has iniciado sesion", "success");

      props.history.push("/");
    } catch (error) {
      if (error.response) {
        Swal.fire({
          icon: "error",
          title: "Hubo un error",
          text: error.response.data.mensaje,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Hubo un error",
          text: "Hubo un error",
        });
      }
    }
  };

  return (
    <div className="login">
      <h2>Iniciar Sesion</h2>
      <div className="contenedor-formulario">
        <form onSubmit={iniciarSesion}>
          <div className="campo">
            <label>Email</label>
            <input
              type="text"
              name="email"
              placeholder="Email para iniciar sesion"
              required
              onChange={leerDatos}
            />
          </div>

          <div className="campo">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password para iniciar sesion"
              required
              onChange={leerDatos}
            />
          </div>

          <input
            type="submit"
            value="Iniciar Sesion"
            className="btn btn-verde btn-block"
          />
        </form>
      </div>
    </div>
  );
};

export default withRouter(Login);
