import Axios from "axios";
import { Personaje } from "./modelo";
import { URL_BUSQUEDA } from "./constantes";

export const leePersonajes = async (): Promise<Personaje[]> => {
  try {
    const { data } = await Axios.get("http://localhost:3000/personajes");
    return data;
  } catch (error) {
    throw new Error("Error al obtener el listado de personajes");
  }
};

export const filtraPersonaje = async (
  personajeIntroducido: string
): Promise<Personaje[]> => {
  try {
    const { data } = await Axios.get(URL_BUSQUEDA + `${personajeIntroducido}`);
    return data;
  } catch (error) {
    throw new Error("Error al obtener los personajes filtrados");
  }
};
