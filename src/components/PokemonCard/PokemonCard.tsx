"use client";

import { PokemonCard, PokemonResponse } from "@/lib/types/typesPokemon";
import Image from "next/image";
import { Card } from "primereact/card";
import { Badge } from "primereact/badge";
import React, { useEffect, useState } from "react";
import { getPokemonById } from "@/lib/api/apiPokemon";
import { classNames } from "primereact/utils";

export default function PokemonCard({
  pokemonResponse,
}: {
  pokemonResponse: PokemonResponse;
}) {
  const imageLink = `${pokemonResponse.image}/high.png`;
  const [pokemonWithDetail, setPokemonWithDetail] =
    useState<PokemonCard | null>(null);

  useEffect(() => {
    async function loadPokemonDetails() {
      try {
        console.log("Chargement du pokémon");
        const response = await getPokemonById(pokemonResponse.id);
        console.log(response);
        if (!response) {
          return;
        }
        setPokemonWithDetail(response);
      } catch (error) {
        console.log(
          "Erreur lors du chargement du pokémon avec ses détails : ",
          error
        );
      }
    }
    loadPokemonDetails();
  }, [pokemonResponse.id]);

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

  const badgeColor = (type: string): React.CSSProperties => {
    switch (type) {
      case "Plante":
        return { backgroundColor: "#22c55e", color: "#fff" };
      case "Feu":
        return { backgroundColor: "#c52822ff", color: "#fff" };
      case "Eau":
        return { backgroundColor: "#00b8e6ff", color: "#fff" };
      case "Électrique":
        return { backgroundColor: "#fbff00ff", color: "#000000ff" };
      case "Métal":
        return { backgroundColor: "#6b7280", color: "#fff" };
      case "Psy":
        return { backgroundColor: "#a21caf", color: "#fff" };
      default:
        return { backgroundColor: "#e5e7eb", color: "#000" };
    }
  };

  const cardColor = (type: string): React.CSSProperties => {
    switch (type) {
      case "Plante":
        return { backgroundColor: "#adfac9ff", color: "#fff" };
      case "Feu":
        return { backgroundColor: "#f5c8c7ff", color: "#fff" };
      case "Eau":
        return { backgroundColor: "#b6e7f3ff", color: "#fff" };
      case "Électrique":
        return { backgroundColor: "#feffb0ff", color: "#000000ff" };
      case "Métal":
        return { backgroundColor: "#cacacaff", color: "#fff" };
      case "Psy":
        return { backgroundColor: "#ae81b3ff", color: "#fff" };
      default:
        return { backgroundColor: "#e5e7eb", color: "#000" };
    }
  };

  const footer = (
    <div className="flex justify-between p-4">
      {pokemonWithDetail &&
        pokemonWithDetail.types &&
        pokemonWithDetail.types.length > 0 &&
        pokemonWithDetail.types.map((type, index) => (
          <Badge key={index} value={type} style={badgeColor(type)} />
        ))}
    </div>
  );

  return (
    <Card
      title={pokemonWithDetail?.name}
      header={header}
      footer={footer}
      style={
        pokemonWithDetail &&
        pokemonWithDetail.types &&
        pokemonWithDetail.types.length > 0
          ? cardColor(pokemonWithDetail.types[0])
          : { backgroundColor: "#e5e7eb", color: "#000" }
      }
    >
      <p className="PokemonCard-Description">
        {pokemonWithDetail?.description || "Pas de description disponible"}
      </p>
    </Card>
  );
}
