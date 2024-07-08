export default async function getData(url: string) {
  const fetcher = $fetch.create({
    baseURL: useRuntimeConfig().public.baseURL || "https://www.example.com",
  });

  return await fetcher(url);
}
