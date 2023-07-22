import { Personaje } from "./modelo";
import { vi } from "vitest";
import Axios from "axios";
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

  it('debería devolver una error "Error al obtener los personajes" cuando rechaza la solicitud', async () => {
    // Arrange
    vi.spyOn(Axios, "get").mockRejectedValue("Error al obtener los personajes");
    // Act
    try {
      await leePersonajes();
    } catch (error: any) {
      // Assert
      expect(error.message).toEqual("Error al obtener los personajes");
    }
  });
});
