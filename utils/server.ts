export async function fetchGraphQL(query: string, variables: Record<string, any>, operationName: string) {
    const response = await fetch(
      "https://beta.pokeapi.co/graphql/v1beta",
      {
        method: "POST",
        body: JSON.stringify({
          query: query,
          variables: variables,
          operationName: operationName
        })
      }
    )

    const data = await response.json() as any;

    return data.data;
}