import { chatModel } from "../utils/gpt-connection.js";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";
import { getJobs } from "../utils/api-connection.js";
import "dotenv/config";

let chatHistory = [
  ["system", "you are a job coach who loves to help people get a job"],
];

async function askGPT(req) {
  let messages = chatHistory;
  messages.push(["human", req]);

  // Check if the user is asking for job search
  if (req.toLowerCase().includes("find me a job")) {
    const jobQuery = req.split("find me a job ")[1]; // Extract the job query
    const jobResults = await getJobs(jobQuery); // Fetch jobs from Indeed API
    if (jobResults) {
      const jobInfo = jobResults.slice(0, 5).map(job => `Title: ${job.title}, Location: ${job.location}`).join("\n");
      messages.push(["ai", `Here are some job results:\n${jobInfo}`]);
      return `Here are some job results:\n${jobInfo}`;
    } else {
      messages.push(["ai", "I couldn't find any jobs for that query. Please try again."]);
      return "I couldn't find any jobs for that query. Please try again.";
    }
  } else {
    const res = await chatModel.invoke(messages);
    messages.push(["ai", res.content]);
    return res.content;
  }
}

export { askGPT };
