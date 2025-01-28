interface FetchError {
  data: Record<string, any>;
  response: Response;
  request: Request;
  status: number;
  statusCode: number;
  statusMessage: string;
  statusText: string;
}

type IResponse<T> = T & {
  error: undefined;
}

export default async function getData<T>(url: string, options?: Parameters<typeof $fetch>[1]): Promise<IResponse<T> | { error: FetchError }> {
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
