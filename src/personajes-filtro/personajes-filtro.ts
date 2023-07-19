import { BOTON_NUEVA_BUSQUEDA } from "./personajes-filtro.constantes";

const capturaNombreUrl = (): string => {
  const parametrosUrl = new URLSearchParams(window.location.search);
  const nombre = parametrosUrl.get("nombre") || "";
  return decodeURIComponent(nombre);
};

console.log("El nombre es:", capturaNombreUrl());

//Regresar a la página de inicio:

const generaNuevaBusqueda = () => {
  window.location.href = `/personajes-listado/index.html`;
};

if (BOTON_NUEVA_BUSQUEDA) {
  BOTON_NUEVA_BUSQUEDA.addEventListener("click", () => generaNuevaBusqueda());
}
