import { Pinecone } from "@pinecone-database/pinecone"

export const pc = new Pinecone({
    // Assert that PINECONE_API_KEY is not null
    apiKey : process.env.PINECONE_API_KEY!,
})