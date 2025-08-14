import {
  PokemonCardType,
  PokemonListResponse,
  PokemonResponse,
} from "../types/typesPokemon";

const BASE_URL = "https://api.tcgdex.net/v2/fr";

export async function getAllPokemon(
  limit: number,
  page?: number
): Promise<PokemonListResponse> {
  if (limit && page) {
    const response = await fetch(
      `${BASE_URL}/cards?pagination:page=${page}&pagination:itemsPerPage=${limit}`
    );

    if (!response.ok) {
      throw new Error("Erreur lors du chargement des Pokémons");
    }

    const data: PokemonListResponse = await response.json();
    console.log(data);
    return data;
  }
}

export async function getPokemonById(id: string): Promise<PokemonCardType> {
  const response = await fetch(`${BASE_URL}/cards/${id}`);

  if (!response.ok) {
    throw new Error(`Erreur lors du chargement du Pokémon avec l'ID ${id}`);
  }
  return response.json();
}

export async function searchPokemonByName(
  search: string
): Promise<PokemonListResponse | [PokemonResponse]> {
  const response = await fetch(`${BASE_URL}/cards?name=${search}`);

  if (!response.ok) {
    throw new Error("Erreur lors du chargement des Pokémons");
  }
  const data: PokemonListResponse = await response.json();
  console.log(data);
  return data;
}
