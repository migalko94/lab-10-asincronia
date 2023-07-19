import { pintaTodosPersonajes } from "../ui.common";
import { filtraPersonaje } from "./personajes-filtro.api";
import { BOTON_NUEVA_BUSQUEDA } from "./personajes-filtro.constantes";

const capturaNombreUrl = (): string => {
  const parametrosUrl = new URLSearchParams(window.location.search);
  const nombre = parametrosUrl.get("nombre") || "";
  return decodeURIComponent(nombre);
};

const generaNuevaBusqueda = () =>
  (window.location.href = `/personajes-listado/index.html`);

if (BOTON_NUEVA_BUSQUEDA) {
  BOTON_NUEVA_BUSQUEDA.addEventListener("click", () => generaNuevaBusqueda());
}

const devuelvePersonajeIntroducido = async (): Promise<void> =>
  pintaTodosPersonajes(await filtraPersonaje(capturaNombreUrl()));

document.addEventListener("DOMContentLoaded", () =>
  devuelvePersonajeIntroducido()
);
