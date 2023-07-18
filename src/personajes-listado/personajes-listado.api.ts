import Axios from "axios";
import { URL_PERSONAJES } from "./personajes-listado.constantes";
import { Personaje } from "./personajes-listado.model";

export const leePersonajes = async (): Promise<Personaje[]> => {
  try {
    const { data } = await Axios.get(URL_PERSONAJES);
    return data;
  } catch (error) {
    throw new Error("Error al obtener las películas");
  }
};
