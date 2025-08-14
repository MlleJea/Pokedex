"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { getAllPokemon, getPokemonById, searchPokemonByName } from "@/lib/api/apiPokemon";
import { PokemonListResponse, PokemonResponse } from "@/lib/types/typesPokemon";
import PokemonCard from "@/components/PokemonCard/PokemonCard";
import { DataView } from "primereact/dataview";
import { Button } from "primereact/button";
import { Badge } from "primereact/badge";

export default function Home() {
  const [pokemons, setPokemons] = useState<PokemonListResponse>();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [numberItems, setNumberItems] = useState(20);

  useEffect(() => {
    async function loadAllPokemon() {
      try {
        console.log("Chargement des Pokemons...");
        const pokemonList = await getAllPokemon(numberItems, page);

        console.log("Nombre de Pokemons chargés:", pokemonList.length);

        setPokemons(pokemonList);
      } catch (error) {
        console.error("Erreur lors du chargement des Pokémons :", error);
      }
    }
    loadAllPokemon();
  }, []);

  const searchPokemon = (search: string) => {
    const pokemonsSearched = searchPokemonByName(search);
    setPokemons(pokemonsSearched);

  };

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
          <Button name="Rechercher" onClick={() =>searchPokemon(search)} />
        </div>
        <DataView
          value={pokemons}
          key={"localId"}
          itemTemplate={itemTemplate}
          layout="grid"
          className="PokemonList"
        />
        <div>
          <Button
            label="<"
            onClick={() => {
              page - 1;
            }}
            disabled={page === 1}
          />
          <Badge value={page} />
          <Button
            label=">"
            onClick={() => {
              page + 1;
            }}
          />
        </div>
      </main>
      <footer className="footer"></footer>
    </div>
  );
}
