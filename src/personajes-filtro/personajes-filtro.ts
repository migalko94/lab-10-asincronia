import { filtraPersonaje } from "./personajes-filtro.api";
import {
  BOTON_NUEVA_BUSQUEDA,
  TABLERO_PERSONAJES,
  URL_RAIZ,
} from "./personajes-filtro.constantes";
import { Personaje } from "./personajes-filtro.model";

const capturaNombreUrl = (): string => {
  const parametrosUrl = new URLSearchParams(window.location.search);
  const nombre = parametrosUrl.get("nombre") || "";
  return decodeURIComponent(nombre);
};

console.log("El nombre es:", capturaNombreUrl());

const generaNuevaBusqueda = () => {
  window.location.href = `/personajes-listado/index.html`;
};

if (BOTON_NUEVA_BUSQUEDA) {
  BOTON_NUEVA_BUSQUEDA.addEventListener("click", () => generaNuevaBusqueda());
}
const pintaImagenPersonaje = (
  personajes: Personaje[],
  indice: number,
  divPersonaje: HTMLElement
) => {
  const imagen = document.createElement("img");
  imagen.setAttribute("data-imagen", indice.toString());
  imagen.src = URL_RAIZ + personajes[indice].imagen;
  imagen.alt = URL_RAIZ + personajes[indice].nombre;
  divPersonaje.appendChild(imagen);
};

const pintaAtributoPersonaje = (
  divPersonaje: HTMLElement,
  indice: number,
  personajes: Personaje[],
  tipoInfo: string
) => {
  const atributoPersonaje = document.createElement("p");
  atributoPersonaje.id = `${tipoInfo}-${indice}`;
  if (divPersonaje && atributoPersonaje) {
    switch (tipoInfo) {
      case "nombre":
        atributoPersonaje.innerHTML = `<span>Nombre:</span>${personajes[indice].nombre}`;
        break;
      case "especialidad":
        atributoPersonaje.innerHTML = `<span>Especialidad:</span>${personajes[indice].especialidad}`;
        break;
      case "habilidades":
        atributoPersonaje.innerHTML = `<span>Habilidad:</span>${personajes[indice].habilidades}`;
        break;
      default:
        console.error("El atributo no existe");
    }
    divPersonaje.appendChild(atributoPersonaje);
  }
};

const pintaDescripcionPersonaje = (
  divPersonaje: HTMLElement,
  indice: number,
  personajes: Personaje[]
) => {
  pintaAtributoPersonaje(divPersonaje, indice, personajes, "nombre");
  pintaAtributoPersonaje(divPersonaje, indice, personajes, "especialidad");
  pintaAtributoPersonaje(divPersonaje, indice, personajes, "habilidades");
};

const creaDivPersonaje = (indice: number): HTMLDivElement => {
  const divPersonaje = document.createElement("div");
  divPersonaje.id = `personaje-elemento-${indice}`;
  return divPersonaje;
};

const incluyePersonajeEnTablero = (divPersonaje: HTMLDivElement) => {
  if (TABLERO_PERSONAJES) {
    TABLERO_PERSONAJES.appendChild(divPersonaje);
  }
};

const pintaPersonajeIndividual = (personajes: Personaje[], indice: number) => {
  const divPersonaje = creaDivPersonaje(indice);
  pintaImagenPersonaje(personajes, indice, divPersonaje);
  pintaDescripcionPersonaje(divPersonaje, indice, personajes);
  incluyePersonajeEnTablero(divPersonaje);
};

export const pintaTodosPersonajes = (personajes: Personaje[]) => {
  for (let indice = 0; indice < personajes.length; indice++) {
    pintaPersonajeIndividual(personajes, indice);
  }
};

const devuelvePersonajeIntroducido = async (): Promise<void> => {
  const personajes = await filtraPersonaje(capturaNombreUrl());
  pintaTodosPersonajes(personajes);
};

document.addEventListener("DOMContentLoaded", () =>
  devuelvePersonajeIntroducido()
);
