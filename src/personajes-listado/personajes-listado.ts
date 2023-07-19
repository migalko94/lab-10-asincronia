import { BOTON_FILTRAR, CAMPO_PERSONAJE } from "../constantes.common";
import { pintaTodosPersonajes } from "../ui.common";
import { leePersonajes } from "./personajes-listado.api";

const cargaPersonajes = async (): Promise<void> =>
  pintaTodosPersonajes(await leePersonajes());

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

document.addEventListener("DOMContentLoaded", () => cargaPersonajes());
