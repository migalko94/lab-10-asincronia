import { BOTON_FILTRAR, CAMPO_PERSONAJE } from "../constantes.common";
import { crearContenedorPersonaje } from "../ui.common";

import { leePersonajes } from "./personajes-listado.api";

const pintarPersonajes = async (): Promise<void> => {
  const personajes = await leePersonajes();
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

const realizaFiltradoPersonaje = (nombre: string) =>
  (window.location.href = `/personajes-filtro/index.html?nombre=${encodeURIComponent(
    nombre
  )}`);

if (BOTON_FILTRAR && BOTON_FILTRAR instanceof HTMLElement) {
  BOTON_FILTRAR.addEventListener("click", () => {
    if (CAMPO_PERSONAJE && CAMPO_PERSONAJE instanceof HTMLInputElement) {
      realizaFiltradoPersonaje(CAMPO_PERSONAJE.value);
    }
  });
}

document.addEventListener("DOMContentLoaded", () => pintarPersonajes());
