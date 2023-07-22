import { Personaje } from "./modelo";
import {
  BOTON_FILTRAR,
  CAMPO_PERSONAJE,
  TABLERO_PERSONAJES,
  URL_RAIZ,
} from "./constantes";
import { filtraPersonaje, leePersonajes } from "./api";

const crearElementoImagen = (
  figura: string,
  nombre: string
): HTMLImageElement => {
  const imagen = document.createElement("img");
  imagen.src = figura;
  imagen.alt = nombre;
  return imagen;
};

const crearElementoParrafo = (
  enunciado: string,
  texto: string
): HTMLParagraphElement => {
  const parrafo = document.createElement("p");
  parrafo.innerHTML = `<span>${enunciado}:</span>${texto}`;
  return parrafo;
};

export const creaContenedorPersonaje = (
  personaje: Personaje
): HTMLDivElement => {
  const elementoPersonaje = document.createElement("div");
  elementoPersonaje.classList.add("personaje-contenedor");

  elementoPersonaje.append(
    crearElementoImagen(URL_RAIZ + personaje.imagen, personaje.nombre),
    crearElementoParrafo("Nombre", personaje.nombre),
    crearElementoParrafo("Especialidad", personaje.especialidad),
    crearElementoParrafo("Habilidades", personaje.habilidades.toString())
  );

  return elementoPersonaje;
};

const pintaPersonajes = async (): Promise<void> => {
  const tablero = document.getElementById("tablero");
  tablero && tablero instanceof HTMLDivElement
    ? (await leePersonajes()).forEach((personaje) => {
        tablero.appendChild(creaContenedorPersonaje(personaje));
      })
    : () => {
        throw new Error("No se ha encontrado el contenedor del listado");
      };
};

const limpiaTablero = () =>
  TABLERO_PERSONAJES && TABLERO_PERSONAJES instanceof HTMLDivElement
    ? (TABLERO_PERSONAJES.innerHTML = "")
    : () => {
        throw new Error("No se ha encontrado el div tablero");
      };

const devuelvePersonajeIntroducido = async (): Promise<void> => {
  if (CAMPO_PERSONAJE && CAMPO_PERSONAJE instanceof HTMLInputElement) {
    const tablero = document.getElementById("tablero");
    tablero && tablero instanceof HTMLDivElement
      ? (await filtraPersonaje(CAMPO_PERSONAJE.value)).forEach((personaje) => {
          tablero.appendChild(creaContenedorPersonaje(personaje));
        })
      : () => {
          throw new Error("No se ha encontrado el contenedor del listado");
        };
  }
};

if (BOTON_FILTRAR && BOTON_FILTRAR instanceof HTMLElement) {
  BOTON_FILTRAR.addEventListener("click", () => {
    if (CAMPO_PERSONAJE && CAMPO_PERSONAJE instanceof HTMLInputElement) {
      limpiaTablero();
      devuelvePersonajeIntroducido();
    }
  });
}

document.addEventListener("DOMContentLoaded", () => pintaPersonajes());
