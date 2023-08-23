import { Personaje } from "./modelo";
import { vi } from "vitest";
import Axios, { AxiosError } from "axios";
import { leePersonajes } from "./api";

describe("leePersonajes", () => {
  it("debería devolver personajes cuando la solicitud tiene una respuesta correcta", async () => {
    // Arrange
    const personajesMock: Personaje[] = [
      {
        id: "1",
        nombre: "Mortadelo",
        apodo: "Mortadelo",
        especialidad: "Disfraces",
        habilidades: ["Camuflaje", "Imitaciones", "Huida rápida"],
        amigo: "Filemón",
        imagen: "mortadelo.webp",
      },
    ];

    vi.spyOn(Axios, "get").mockResolvedValue({
      data: personajesMock,
    });
    // Act

    const result = await leePersonajes();
    // Assert
    expect(result).toEqual(personajesMock);
  });

  it('debería devolver una error "Demasiadas llamadas a la API de Personajes!" cuando rechaza la solicitud con el código 403', async () => {
    // Arrange
    vi.spyOn(Axios, "get").mockRejectedValue({
      response: {
        status: 403,
      },
    } as AxiosError);
    // Act
    try {
      await leePersonajes();
    } catch (error) {
      // Assert
      expect(error).toEqual("Demasiadas llamadas a la API de Personajes!");
    }
  });

  it('debería devolver una error "Unavailable service" cuando rechaza la solicitud  con el código 503', async () => {
    // Arrange
    vi.spyOn(Axios, "get").mockRejectedValue({
      response: {
        status: 503,
      },
    } as AxiosError);
    // Act
    try {
      await leePersonajes();
    } catch (error) {
      // Assert
      expect(error).toEqual("Unavailable service");
    }
  });
  it('debería devolver un error "Personaje not found" cuando rechaza la solicitud con el código 404', async () => {
    // Arrange
    vi.spyOn(Axios, "get").mockRejectedValue({
      response: {
        status: 404,
      },
    } as AxiosError);
    // Act
    try {
      await leePersonajes();
    } catch (error) {
      // Assert
      expect(error).toEqual("Personaje not found");
    }
  });

  it('debería devolver una error "Internal server error" cuando rechaza la solicitud con el código 500', async () => {
    // Arrange
    vi.spyOn(Axios, "get").mockRejectedValue({
      response: {
        status: 500,
      },
    } as AxiosError);
    // Act
    try {
      await leePersonajes();
    } catch (error) {
      // Assert
      expect(error).toEqual("Internal server error");
    }
  });
});
