"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { getAllPokemon, getPokemonById } from "@/lib/api/apiPokemon";
import { PokemonListResponse, PokemonResponse } from "@/lib/types/typesPokemon";
import PokemonCard from "@/components/PokemonCard/PokemonCard";
import { DataView } from "primereact/dataview";

export default function Home() {
  const [pokemons, setPokemons] = useState<PokemonListResponse>();

  useEffect(() => {
    async function loadAllPokemon() {
      try {
        console.log("Chargement des Pokemons...");
        const pokemonList = await getAllPokemon(20);

        console.log("Nombre de Pokemons chargés:", pokemonList.results.length);

        setPokemons(pokemonList);
      } catch (error) {
        console.error("Erreur lors du chargement des Pokémons :", error);
      }
    }
    loadAllPokemon();
  }, []);

  const itemTemplate = (pokemon: PokemonResponse) => {
    return (
      <div className="p-3">
        <PokemonCard key={pokemon.id} pokemonResponse={pokemon} />
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
          style={{ height: "auto", width: "auto" }}
          priority
        />
      </header>
      <main className="main">
        <DataView
          value={pokemons}
          key={"localId"}
          itemTemplate={itemTemplate}
          layout="grid"
          className="PokemonList"
        />
      </main>
      <footer className="footer"></footer>
    </div>
  );
}
