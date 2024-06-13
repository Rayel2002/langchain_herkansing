import { chatModel } from "../utils/gpt-connection.js";
import { getJobs } from "../utils/api-connection.js";
import { initPinecone, upsertEmbedding, queryEmbedding } from "../utils/pinecone-connection.js";
import { Embeddings } from "@langchain/core/embeddings";
import "dotenv/config";

let chatHistory = [
  ["system", "you are a job coach who loves to help people get a job"],
];

initPinecone();

async function askGPT(req) {
  let messages = chatHistory;
  messages.push(["human", req]);

  if (req.toLowerCase().includes("find me a job")) {
    const jobQuery = req.split("find me a job ")[1];
    const jobResults = await getJobs(jobQuery);
    if (jobResults) {
      const jobInfo = jobResults.slice(0, 5).map(job => `Title: ${job.title}, Location: ${job.location}`).join("\n");
      messages.push(["ai", `Here are some job results:\n${jobInfo}`]);
      return { content: `Here are some job results:\n${jobInfo}`, relatedMessages: [] };
    } else {
      messages.push(["ai", "I couldn't find any jobs for that query. Please try again."]);
      return { content: "I couldn't find any jobs for that query. Please try again.", relatedMessages: [] };
    }
  } else {
    const res = await chatModel.invoke(messages);
    messages.push(["ai", res.content]);

    const embeddings = await Embeddings.embedText(req);
    await upsertEmbedding(embeddings, { id: `msg-${Date.now()}`, text: req });

    const relatedMessages = await queryEmbedding(embeddings, 3);
    const relatedText = relatedMessages.map(m => m.metadata.text);

    return { content: res.content, relatedMessages: relatedText };
  }
}

export { askGPT };
