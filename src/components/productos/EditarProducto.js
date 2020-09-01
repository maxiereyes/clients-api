import React, { Fragment, useState, useEffect } from "react";
import Swal from "sweetalert2";
import clienteAxios from "../../config/axios";
import { withRouter } from "react-router-dom";

const EditarProducto = (props) => {
  const { id } = props.match.params;

  const [producto, guardarProducto] = useState({
    nombre: "",
    precio: "",
    imagen: "",
  });

  const [archivo, guardarArchivo] = useState("");

  const leerInformacionProducto = (e) => {
    guardarProducto({
      ...producto,
      [e.target.name]: e.target.value,
    });
  };

  const leerArchivo = (e) => {
    guardarArchivo(e.target.files[0]);
  };

  useEffect(() => {
    const consultarApi = async () => {
      const productoConsulta = await clienteAxios.get(`/productos/${id}`);

      guardarProducto(productoConsulta.data);
    };

    consultarApi();
    // eslint-disable-next-line
  }, []);

  const { nombre, precio, imagen } = producto;

  const editarProducto = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("nombre", producto.nombre);
    formData.append("precio", producto.precio);
    formData.append("imagen", archivo);

    try {
      const res = await clienteAxios.put(`/productos/${id}`, formData, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      });

      if (res.status === 200) {
        Swal.fire("Modificado Correctamente", res.data.mensaje, "success");
      }

      props.history.push("/productos");
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Hubo un error",
        text: "Vuelva a intentarlo",
      });
    }
  };

  return (
    <Fragment>
      <h2>Editar Producto</h2>
      <form onSubmit={editarProducto}>
        <legend>Llena todos los campos</legend>

        <div className="campo">
          <label>Nombre:</label>
          <input
            type="text"
            placeholder="Nombre Producto"
            name="nombre"
            onChange={leerInformacionProducto}
            defaultValue={nombre}
          />
        </div>

        <div className="campo">
          <label>Precio:</label>
          <input
            type="number"
            placeholder="Precio Producto"
            name="precio"
            min="0.00"
            step="0.01"
            onChange={leerInformacionProducto}
            value={precio}
          />
        </div>

        <div className="campo">
          <label>Imagen:</label>
          {imagen ? (
            <img
              src={`${process.env.REACT_APP_BACKEND_URL}/${imagen}`}
              alt={nombre}
              width="300"
            />
          ) : null}
          <input type="file" name="imagen" onChange={leerArchivo} />
        </div>

        <div>
          <input
            type="submit"
            className="btn btn-azul"
            value="Editar Producto"
          />
        </div>
      </form>
    </Fragment>
  );
};

export default withRouter(EditarProducto);
