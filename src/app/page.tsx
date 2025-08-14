"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  getAllPokemon,
  getPokemonById,
  searchPokemonByName,
} from "@/lib/api/apiPokemon";
import { PokemonCardType, PokemonResponse } from "@/lib/types/typesPokemon";
import PokemonCard from "@/components/PokemonCard/PokemonCard";
import { DataView } from "primereact/dataview";
import { Button } from "primereact/button";
import { Badge } from "primereact/badge";

export default function Home() {
  const [pokemons, setPokemons] = useState<PokemonCardType[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [numberItems, setNumberItems] = useState(20);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadAllPokemon() {
      try {
        setLoading(true);
        console.log("Chargement des Pokemons...");
        const pokemonList: PokemonResponse[] = await getAllPokemon(
          numberItems,
          page
        );

        console.log("Nombre de Pokemons chargés:", pokemonList.length);
        console.log("Réponse getAllPokemon :", pokemonList);

        const details = await Promise.all(
          pokemonList.map((item: PokemonResponse) => getPokemonById(item.id))
        );
        setPokemons(details);
        console.log(details);
      } catch (error) {
        console.error("Erreur lors du chargement des Pokémons :", error);
      } finally {
        setLoading(false);
      }
    }
    loadAllPokemon();
  }, [page, numberItems]);

  const searchPokemon = async (search: string) => {
    if (!search.trim()) {
      window.location.reload();
    }
    try {
      setLoading(true);
      const pokemonList: PokemonResponse[] | [PokemonResponse] =
        await searchPokemonByName(search);
      const details = await Promise.all(
        pokemonList.map((item: PokemonResponse) => getPokemonById(item.id))
      );
      setPokemons(details);
    } catch (error) {
      console.error("Erreur lors de la recherche des Pokémons :", error);
    } finally {
      setLoading(false);
    }
  };

  const itemTemplate = (pokemon: PokemonCardType) => {
    return (
      <div className="p-3">
        <PokemonCard key={pokemon.id} pokemonWithDetail={pokemon} />
      </div>
    );
  };

  return (
    <div className="main-container ">
      <header className="header">
        <Image
          src="/pokemon.png"
          alt="Pokemon logo"
          width={200}
          height={100}
          priority
        />
      </header>
      <main className="main">
        <div>
          <input
            type="text"
            placeholder="Rechercher un Pokémon"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button name="Rechercher" onClick={() => searchPokemon(search)} />
        </div>
        <DataView
          value={pokemons}
          itemTemplate={itemTemplate}
          layout="grid"
          className="PokemonList"
        />
        <div>
          <Button
            label="<"
            onClick={() => {
              setPage(page - 1);
            }}
            disabled={page === 1}
          />
          <Badge value={page} />
          <Button
            label=">"
            onClick={() => {
              setPage(page + 1);
            }}
          />
        </div>
      </main>
      <footer className="footer"></footer>
    </div>
  );
}
