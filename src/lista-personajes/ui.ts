import { Personaje } from "./modelo";
import {
  BOTON_FILTRAR,
  CAMPO_PERSONAJE,
  FORMULARIO,
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

const creaContenedorPersonaje = (personaje: Personaje): HTMLDivElement => {
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

const pintaPersonajes = (personajes: Personaje[]) => {
  personajes.forEach((personaje) => {
    if (TABLERO_PERSONAJES && TABLERO_PERSONAJES instanceof HTMLDivElement) {
      TABLERO_PERSONAJES.appendChild(creaContenedorPersonaje(personaje));
    }
  });
};

const limpiaTablero = () =>
  TABLERO_PERSONAJES && TABLERO_PERSONAJES instanceof HTMLDivElement
    ? (TABLERO_PERSONAJES.innerHTML = "")
    : () => {
        throw new Error("No se ha encontrado el div tablero");
      };

const cargaPersonajes = async (): Promise<void> => {
  const personajes = await leePersonajes();
  TABLERO_PERSONAJES && TABLERO_PERSONAJES instanceof HTMLDivElement
    ? pintaPersonajes(personajes)
    : () => {
        throw new Error("No se ha encontrado el contenedor del listado");
      };
};

const devuelvePersonajeIntroducido = async (evento: Event): Promise<void> => {
  evento.preventDefault();
  if (CAMPO_PERSONAJE && CAMPO_PERSONAJE instanceof HTMLInputElement) {
    const personajes = await filtraPersonaje(CAMPO_PERSONAJE.value);
    TABLERO_PERSONAJES && TABLERO_PERSONAJES instanceof HTMLDivElement
      ? pintaPersonajes(personajes)
      : () => {
          throw new Error("No se ha encontrado el contenedor del listado");
        };
  }
};

const iniciaFormulario = () => {
  if (FORMULARIO && FORMULARIO instanceof HTMLFormElement) {
    FORMULARIO.addEventListener("submit", (submit) => {
      limpiaTablero();
      devuelvePersonajeIntroducido(submit);
    });
  } else {
    throw new Error("No se ha encontrado el formulario");
  }
};

const iniciaBotonFiltro = () => {
  if (BOTON_FILTRAR && BOTON_FILTRAR instanceof HTMLElement) {
    BOTON_FILTRAR.addEventListener("click", (click) => {
      if (CAMPO_PERSONAJE && CAMPO_PERSONAJE instanceof HTMLInputElement) {
        limpiaTablero();
        devuelvePersonajeIntroducido(click);
      }
    });
  }
};
const manejaBusqueda = () => {
  iniciaFormulario();
  iniciaBotonFiltro();
};

document.addEventListener("DOMContentLoaded", () => {
  cargaPersonajes();
  manejaBusqueda();
});
