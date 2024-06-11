import { chatModel } from "../utils/gpt-connection.js";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";
import { getAPI } from "../utils/api-connection.js";
import "dotenv/config";

let chatHistory = [
  ["system", "you are a job coach who loves to help people get a job"],
];

async function askGPT(req) {
  let messages = chatHistory;
  messages.push(["human", req]);
  const res = await chatModel.invoke(messages);
  messages.push(["ai", res.content]);
  return res.content;
}

export { askGPT };
