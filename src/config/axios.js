import axios from "axios";

const clienteAxios = axios.create({
  baseUrl: "http://localhost:5000",
});

export default clienteAxios;
