import type { IPokemonShort } from "~/types/pokemon";

export function calcular(value1: number, value2: number, type: string) {
  let result = 0;
  switch (type) {
    case "add":
      result = parseInt(value1.toString()) + parseInt(value2.toString());
      break;
    case "multiply":
      result = parseInt(value1.toString()) * parseInt(value2.toString());
      break;
    case "substraction":
      result = parseInt(value1.toString()) - parseInt(value2.toString());
      break;
    case "division":
      result = parseInt(value1.toString()) / parseInt(value2.toString());
      break;
  }
  return result;
}

export function getTypeColor(type: string): string {
  const colors: Record<string, string> = {
    grass: 'success',
    fire: 'error',
    water: 'primary',
    electric: 'yellow darken-2',
    ice: 'light-blue',
    fighting: 'deep-orange darken-2',
    poison: 'purple darken-2',
    ground: 'brown darken-2',
    flying: 'blue-grey darken-1',
    psychic: 'pink darken-2',
    bug: 'lime darken-3',
    rock: 'orange darken-3',
    ghost: 'indigo darken-4',
    dragon: 'deep-purple darken-4',
    dark: 'grey darken-3',
    steel: 'blue-grey darken-2',
    fairy: 'pink lighten-2'
  }
  
  return colors[type] || 'gray'
}

export function getImage(pokemon: IPokemonShort) {
  const imageURL = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;
  return imageURL;
}