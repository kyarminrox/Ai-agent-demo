import { config } from "dotenv";
config();

import { Agent } from "@voltagent/core";
import { GroqProvider } from "@voltagent/groq-ai";

export const infoAgent = new Agent({
  name: "Info Collector",
  instructions:
    "Ask clarifying questions until you fully understand the user's goal, then produce a concise outline (bulleted or numbered).",
  llm: new GroqProvider({ apiKey: process.env.GROQ_API_KEY! }),
  model: "meta-llama/llama-4-maverick-17b-128e-instruct",
});

export const draftAgent = new Agent({
  name: "Draft Writer",
  instructions:
    "Take the outline and write a coherent first draft in clear, concise prose.",
  llm: new GroqProvider({ apiKey: process.env.GROQ_API_KEY! }),
  model: "meta-llama/llama-4-maverick-17b-128e-instruct",
});

export const psychAgent = new Agent({
  name: "Psych Hooks Specialist",
  instructions:
    "Read the draft and suggest 3 psychological hooks—opening lines or angles that grab attention.",
  llm: new GroqProvider({ apiKey: process.env.GROQ_API_KEY! }),
  model: "meta-llama/llama-4-maverick-17b-128e-instruct",
});
