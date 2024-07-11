export interface IList<T extends any> {
    count: number;
    next: string | null;
    previous: string | null;
    results: T[]
}

export interface IPokemonShort {
    name: string;
    url: string;
}