import Axios from "axios";
import { Personaje } from "./modelo";

const URL_PERSONAJES = "http://localhost:3000/personajes";
const URL_BUSQUEDA = "http://localhost:3000/personajes?nombre_like=";

export const leePersonajes = async (): Promise<Personaje[]> => {
  try {
    const { data } = await Axios.get(URL_PERSONAJES);
    return data;
  } catch (error) {
    throw new Error("Error al obtener el listado de personajes");
  }
};

export const filtraPersonaje = async (
  personajeIntroducido: string
): Promise<Personaje[]> => {
  try {
    const { data } = await Axios.get(
      URL_BUSQUEDA + `${encodeURIComponent(personajeIntroducido)}`
    );
    return data;
  } catch (error) {
    throw new Error("Error al obtener los personajes filtrados");
  }
};
