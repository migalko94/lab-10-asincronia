import Axios from "axios";
import { URL_BUSQUEDA } from "./personajes-filtro.constantes";
import { Personaje } from "../personajes-model";

export const filtraPersonaje = async (
  personajeIntroducido: string
): Promise<Personaje[]> => {
  try {
    const { data } = await Axios.get(URL_BUSQUEDA + `${personajeIntroducido}`);
    return data;
  } catch (error) {
    throw new Error("Error al obtener los personajes");
  }
};
