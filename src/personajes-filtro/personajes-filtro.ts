import { BOTON_NUEVA_BUSQUEDA } from "../constantes.common";
import { crearContenedorPersonaje } from "../ui.common";
import { filtraPersonaje } from "./personajes-filtro.api";

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

const devuelvePersonajeIntroducido = async (): Promise<void> => {
  const personajes = await filtraPersonaje(capturaNombreUrl());
  const tablero = document.getElementById("tablero");
  if (tablero && tablero instanceof HTMLDivElement) {
    personajes.forEach((personaje) => {
      const contenedorPersonaje = crearContenedorPersonaje(personaje);
      tablero.appendChild(contenedorPersonaje);
    });
  } else {
    throw new Error("No se ha encontrado el contenedor del listado");
  }
};

document.addEventListener("DOMContentLoaded", () =>
  devuelvePersonajeIntroducido()
);
