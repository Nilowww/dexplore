interface FetchError {
  data: Record<string, any>;
  response: Response;
  request: Request;
  status: number;
  statusCode: number;
  statusMessage: string;
  statusText: string;
}

type IResponse = {
  [key: string]: any;
  error: never;
}

export default async function getData(url: string, options?: Parameters<typeof $fetch>[1]): Promise<IResponse | { error: FetchError }> {
  try {
    const fetcher = $fetch.create({
      baseURL: useRuntimeConfig().public.baseURL || "https://www.example.com",
    });
  
    return await fetcher(url, options);
  } catch(err) {
    let error = err as FetchError;
    return { error };
  }
}
