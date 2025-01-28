import { serverSupabaseClient } from "#supabase/server";

// Keep-alive endpoint
export default defineEventHandler(async (event) => {
    const client = await serverSupabaseClient(event);

    // Simple query to keep the connection alive
    await client.from("pokemons").select("id").limit(1);

    return { message: "Keep-alive successful" };
});