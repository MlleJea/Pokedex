export interface PokemonCard {
  category: string;
  id: string;
  illustrator: string;
  image: string;
  localId: string;
  name: string;
  rarity: string;
  set: {
    cardCount: {
      official: number;
      total: number;
    };
    id: string;
    logo: string;
    name: string;
    symbol: string;
  };
  variants: {
    firstEdition: boolean;
    holo: boolean;
    normal: boolean;
    reverse: boolean;
    wPromo: boolean;
  };
  hp: number;
  types: string[];
  evolveFrom: string;
  description?: string;
  stage: string;
  attacks: {
    cost: string[];
    name: string;
    effect: string;
    damage?: number;
  }[];
  weaknesses: {
    type: string;
    value: string;
  }[];
  retreat: number;
  regulationMark: string;
  legal: {
    standard: boolean;
    expanded: boolean;
  };
}

export interface PokemonListResponse {
  results: Array<{ pokemons: PokemonResponse }>;
}

export interface PokemonResponse {
  id: string;
  localId: string;
  name: string;
  image: string;
}
