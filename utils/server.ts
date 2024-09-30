export async function fetchGraphQL(query: string, variables: Record<string, any>, operationName: string) {
    try {
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
      if(data.errors) throw new Error(JSON.stringify(data.errors));
  
      return data.data;
    } catch(e) {
      console.error(e)
    }
}