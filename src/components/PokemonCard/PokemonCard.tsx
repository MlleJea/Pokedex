"use client";

import { PokemonCardType, PokemonResponse } from "@/lib/types/typesPokemon";
import Image from "next/image";
import { Card } from "primereact/card";
import { Badge } from "primereact/badge";
import React, { useState } from "react";

export default function PokemonCard({
  pokemonWithDetail,
}: {
  pokemonWithDetail: PokemonCardType;
}) {
  const hasImage =
    pokemonWithDetail.image && pokemonWithDetail.image.trim() !== "";

  const imageLink = hasImage ? `${pokemonWithDetail.image}/high.png` : "";

  const header = (
    <div className=" flex justify-center items-center">
      {hasImage ? (
        <Image
          src={imageLink}
          alt={pokemonWithDetail.name}
          width={130}
          height={150}
          style={{ height: "270px", width: "200px" }}
          className="PokemonCard-Image m-2"
        />
      ) : (
        <div className="flex flex-col items-center justify-center h-[270px] w-[200px] bg-gray-100 rounded-lg border-2 border-dashed border-gray-300">
          <div className="text-center p-2">
            <p className="text-xs text-gray-600 font-medium">
              Pas d'illustration
            </p>
            <p className="text-xs text-gray-500">disponible</p>
          </div>
        </div>
      )}
    </div>
  );

  const typeColor = (type: string): React.CSSProperties => {
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
        return { backgroundColor: "#adfac9ff", color: "#000000ff" };
      case "Feu":
        return { backgroundColor: "#f8a9a7ff", color: "#fff" };
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

  const rarityColor = (rarity: string): React.CSSProperties => {
    switch (rarity) {
      case "Une diamant":
        return { background: "#faf9f7ff", color: "#000" };
      case "Commun":
        return { background: "#faf9f7ff", color: "#000" };
      case "Rare":
        return { background: "#cc9603ff" };
      default:
        return { background: "#fafafaff", color: "#000" };
    }
  };

  const footer = (
    <div className="footerCard">
      {pokemonWithDetail &&
        pokemonWithDetail.types &&
        pokemonWithDetail.types.length > 0 &&
        pokemonWithDetail.types.map((type, index) => (
          <Badge key={index} value={type} style={typeColor(type)} />
        ))}
      <Badge
        value={pokemonWithDetail?.rarity}
        style={rarityColor(pokemonWithDetail?.rarity ?? "")}
      />
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
