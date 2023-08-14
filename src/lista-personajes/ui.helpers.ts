import { TABLERO_PERSONAJES, URL_RAIZ } from "./constantes";
import { Personaje } from "./modelo";

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

export const limpiaTablero = () =>
  TABLERO_PERSONAJES && TABLERO_PERSONAJES instanceof HTMLDivElement
    ? (TABLERO_PERSONAJES.innerHTML = "")
    : () => {
        throw new Error("No se ha encontrado el div tablero");
      };
