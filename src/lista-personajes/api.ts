import Axios, { AxiosError } from "axios";
import { Personaje } from "./modelo";

const URL_PERSONAJES = "http://localhost:3000/personajes";
const URL_BUSQUEDA = "http://localhost:3000/personajes?nombre_like=";

export const leePersonajes = (): Promise<Personaje[]> => {
  const promise = new Promise<Personaje[]>((resolve, reject) => {
    Axios.get(URL_PERSONAJES)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error: AxiosError) => {
        switch (error.response?.status) {
          case 403:
            reject("Demasiadas llamadas a la API de Personajes!");
          case 503:
            reject("Unavailable service");
          case 404:
            reject("Personaje not found");
          case 500:
            reject("Internal server error");
        }
      });
  });
  return promise;
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
