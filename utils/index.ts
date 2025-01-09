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

export const types = [
  "grass",
  "poison",
  "fire",
  "flying",
  "water",
  "bug",
  "normal",
  "electric",
  "ground",
  "fairy",
  "fighting",
  "psychic",
  "rock",
  "ice",
  "dragon",
  "ghost",
  "steel",
  "dark",
];

export function getTypeColor(type: string): string {
  switch (type) {
    case "grass":
      return "success";
    case "fire":
      return "error";
    case "water":
      return "primary";
    case "electric":
      return "yellow darken-2";
    case "ice":
      return "light-blue";
    case "fighting":
      return "deep-orange darken-2";
    case "poison":
      return "purple darken-2";
    case "ground":
      return "brown darken-2";
    case "flying":
      return "blue-grey darken-1";
    case "psychic":
      return "pink darken-2";
    case "bug":
      return "lime darken-3";
    case "rock":
      return "orange darken-3";
    case "ghost":
      return "indigo darken-4";
    case "dragon":
      return "deep-purple darken-4";
    case "dark":
      return "grey darken-3";
    case "steel":
      return "blue-grey darken-2";
    case "fairy":
      return "pink lighten-2";
    default:
      return "grey";
  }
}

export function getStatsColor(stat: string): string {
  switch (stat) {
    case "hp":
      return "green";
    case "attack":
      return "red";
    case "defense":
      return "blue";
    case "special-attack":
      return "#991119";
    case "special-defense":
      return "#09057f";
    case "speed":
      return "#0be0c0";
    default:
      return "grey";
  }
}


export const stats = [
  "hp",
  "attack",
  "defense",
  "special-attack",
  "special-defense",
  "speed",
];

export const rules = {
  isRequired: (v?: string | any[] | null) => Boolean( String (v)?.length) || 'This field is required',
  isNumber: (v: any) => !isNaN(parseFloat(v)) && isFinite(v) || 'This field must be a number',
}