import { Personaje } from "./modelo";
import { CAMPO_PERSONAJE, FORMULARIO, TABLERO_PERSONAJES } from "./constantes";
import { filtraPersonaje, leePersonajes } from "./api";
import { creaContenedorPersonaje, limpiaTablero } from "./ui.helpers";

const pintaPersonajes = (personajes: Personaje[]) => {
  personajes.forEach((personaje) => {
    if (TABLERO_PERSONAJES && TABLERO_PERSONAJES instanceof HTMLDivElement) {
      TABLERO_PERSONAJES.appendChild(creaContenedorPersonaje(personaje));
    }
  });
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

document.addEventListener("DOMContentLoaded", () => {
  cargaPersonajes();
  iniciaFormulario();
});
