import { PokemonCard, PokemonListResponse } from "../types/typesPokemon";

const BASE_URL = "https://api.tcgdex.net/v2/fr";

export async function getAllPokemon(
  limit: number
): Promise<PokemonListResponse> {
  const page = 1;

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

export async function getPokemonById(id: string): Promise<PokemonCard> {
  const response = await fetch(`${BASE_URL}/cards/${id}`);

  if (!response.ok) {
    throw new Error(`Erreur lors du chargement du Pokémon avec l'ID ${id}`);
  }
  return response.json();
}
