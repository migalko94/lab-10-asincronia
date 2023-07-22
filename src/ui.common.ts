import { URL_RAIZ } from "./constantes.common";
import { Personaje } from "./personajes-model";

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

export const crearContenedorPersonaje = (
  personaje: Personaje
): HTMLDivElement => {
  const elementoPersonaje = document.createElement("div");
  elementoPersonaje.classList.add("personaje-contenedor");
  const imagen = crearElementoImagen(
    URL_RAIZ + personaje.imagen,
    personaje.nombre
  );
  elementoPersonaje.appendChild(imagen);
  const nombre = crearElementoParrafo("Nombre", personaje.nombre);
  elementoPersonaje.appendChild(nombre);
  const especialidad = crearElementoParrafo(
    "Especialidad",
    personaje.especialidad
  );
  elementoPersonaje.appendChild(especialidad);
  const habilidades = crearElementoParrafo(
    "Habilidades",
    personaje.habilidades.toString()
  );
  elementoPersonaje.appendChild(habilidades);
  return elementoPersonaje;
};
