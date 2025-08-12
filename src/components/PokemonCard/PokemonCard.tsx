"use client";

import { PokemonResponse } from "@/lib/types/typesPokemon";
import Image from "next/image";
import { Card } from "primereact/card";
import { Badge } from "primereact/badge";
import React, { useEffect, useState } from "react";
import { getPokemonById } from "@/lib/api/apiPokemon";

export default function PokemonCard({
  pokemonResponse,
}: {
  pokemonResponse: PokemonResponse;
}) {
  const imageLink = `${pokemonResponse.image}/high.png`;
  const [pokemonWithDetail, setPokemonWithDetail] = useState<PokemonCard>();

  useEffect(() => {
    async function loadPokemonDetails() {
      try {
        console.log("Chargement du pokémon");
        const pokemonWithDetail = await getPokemonById(pokemonResponse.id);
        console.log(pokemonWithDetail);
        setPokemonWithDetail(pokemonWithDetail);
      } catch (error) {
        console.log(
          "Erreur lors du chargement du pokémon avec ses détails : ",
          error
        );
      }
    }
    loadPokemonDetails();
  }, []);

  const header = (
    <div className=" flex align-self-center">
      <Image
        src={imageLink}
        alt={pokemonResponse.name}
        width={150}
        height={150}
        style={{ height: "auto", width: "auto" }}
        className="PokemonCard-Image"
      />
    </div>
  );

  const footer = (
    <div className="flex justify-between p-4">
      {pokemonWithDetail &&
        pokemonWithDetail.types &&
        pokemonWithDetail.types.length > 0 &&
        pokemonWithDetail.types.map((types, index) => (
          <Badge key={index} value={types} className="backgroud-red" />
        ))}
    </div>
  );

  return (
    <Card
      title={pokemonResponse.name}
      header={header}
      footer={footer}
      className="PokemonCard w-100"
    >
      <p className="PokemonCard-Description">
        {pokemonWithDetail?.description || "Pas de description disponible"}
      </p>
    </Card>
  );
}
