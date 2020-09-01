import React, { useEffect, useState, Fragment, useContext } from "react";
import { Link, withRouter } from "react-router-dom";

import clienteAxios from "../../config/axios";

import { CRMContext } from "../../context/CRMContext";

import Cliente from "./Cliente";

const Clientes = (props) => {
  const [clientes, guardarClientes] = useState([]);

  const [auth, guardarAuth] = useContext(CRMContext);

  useEffect(() => {
    if (auth.token !== "") {
      const consultarApi = async () => {
        try {
          const clientesConsulta = await clienteAxios.get("/clientes", {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          });

          guardarClientes(clientesConsulta.data);
        } catch (error) {
          if ((error.response.status = 500)) {
            props.history.push("/iniciar-sesion");
          }
        }
      };
      consultarApi();
    } else {
      props.history.push("/iniciar-sesion");
    }
  }, [clientes]);

  if (!auth.auth) {
    props.history.push("/iniciar-sesion");
  }

  return (
    <Fragment>
      <h2>Clientes</h2>

      <Link to={"/clientes/nuevo"} className="btn btn-verde nvo-cliente">
        <i className="fas fa-plus-circle"></i>
        Nuevo Cliente
      </Link>

      <ul className="listado-clientes">
        {clientes.map((cliente) => (
          <Cliente key={cliente._id} cliente={cliente} />
        ))}
      </ul>
    </Fragment>
  );
};

export default withRouter(Clientes);
