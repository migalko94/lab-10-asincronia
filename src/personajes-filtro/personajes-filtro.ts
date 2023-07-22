import { BOTON_FILTRAR, CAMPO_PERSONAJE } from "../constantes.common";
import {
  crearContenedorPersonaje,
  realizaFiltradoPersonaje,
} from "../ui.common";
import { filtraPersonaje } from "./personajes-filtro.api";

const capturaNombreUrl = (): string => {
  const parametrosUrl = new URLSearchParams(window.location.search);
  const nombre = parametrosUrl.get("nombre") || "";
  return decodeURIComponent(nombre);
};

const devuelvePersonajeIntroducido = async (): Promise<void> => {
  const personajes = await filtraPersonaje(capturaNombreUrl());
  const tablero = document.getElementById("tablero");
  tablero && tablero instanceof HTMLDivElement
    ? personajes.forEach((personaje) => {
        const contenedorPersonaje = crearContenedorPersonaje(personaje);
        tablero.appendChild(contenedorPersonaje);
      })
    : () => {
        throw new Error("No se ha encontrado el contenedor del listado");
      };
};

document.addEventListener("DOMContentLoaded", () =>
  devuelvePersonajeIntroducido()
);

if (BOTON_FILTRAR && BOTON_FILTRAR instanceof HTMLElement) {
  BOTON_FILTRAR.addEventListener("click", () => {
    if (CAMPO_PERSONAJE && CAMPO_PERSONAJE instanceof HTMLInputElement) {
      realizaFiltradoPersonaje(CAMPO_PERSONAJE.value);
    }
  });
}
