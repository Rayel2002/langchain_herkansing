import { Pinecone } from '@pinecone-database/pinecone';

const pc = new Pinecone({ apiKey: 'PINECONE_API_KEY' });

const indexName = "docs-quickstart-index"

await pc.createIndex({
  name: 'quickstart',
  dimension: 1536, // Replace with your model dimensions
  metric: 'cosine', // Replace with your model metric
  spec: { 
      serverless: { 
          cloud: 'aws', 
          region: 'us-east-1' 
      }
  } 
});

// const client = new Pinecone();

async function initPinecone() {
  await client.init({
    apiKey: process.env.PINECONE_API_KEY,
    environment: process.env.PINECONE_ENVIRONMENT,
  });
}

async function upsertEmbedding(embedding, metadata) {
  const index = client.Index(process.env.PINECONE_INDEX_NAME);
  await index.upsert({
    vectors: [
      {
        id: metadata.id,
        values: embedding,
        metadata: metadata,
      },
    ],
  });
}

async function queryEmbedding(query, topK = 10) {
  const index = client.Index(process.env.PINECONE_INDEX_NAME);
  const results = await index.query({
    vector: query,
    topK: topK,
    includeMetadata: true,
  });
  return results.matches;
}

export { initPinecone, upsertEmbedding, queryEmbedding };
