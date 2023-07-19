import Axios from "axios";

import { Personaje } from "../personajes-model";

export const leePersonajes = async (): Promise<Personaje[]> => {
  try {
    const { data } = await Axios.get("http://localhost:3000/personajes");
    return data;
  } catch (error) {
    throw new Error("Error al obtener los personajes");
  }
};
