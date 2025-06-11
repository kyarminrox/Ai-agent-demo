import { config } from "dotenv";
config();

import { Agent, VoltAgent, VoltAgentExporter } from "@voltagent/core";
import { NodeSDK } from "@opentelemetry/sdk-node";
import { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node";
import { infoAgent, draftAgent, psychAgent } from "./agents.js"; // define your agents here

// 1) Observability
const exporter = new VoltAgentExporter({
  publicKey: process.env.VOLTAGENT_PUBLIC_KEY!,
  secretKey: process.env.VOLTAGENT_SECRET_KEY!,
  baseUrl:   "https://api.voltagent.dev",
});

// Initialize OpenTelemetry
const sdk = new NodeSDK({
  traceExporter: exporter as any, // Casting VoltAgentExporter to SpanExporter
  instrumentations: [getNodeAutoInstrumentations()],
});

sdk.start();
console.log('OpenTelemetry initialized');

// 2) Supervisor Agent
export const supervisor = new Agent({
  name:         "Blog Pipeline Supervisor",
  instructions: `You are a coordinator that manages a team of specialized agents to create content.
Your process is:
1. First, use the Info Collector to gather information and create an outline
2. Then, use the Draft Writer to create a draft based on the outline
3. Finally, use the Psych Hooks Specialist to create attention-grabbing hooks
4. Combine all outputs into a final, well-structured response

Always wait for each agent to complete their task before moving to the next step.
Format your final output clearly with sections for Outline, Draft, and Psychological Hooks.`,
  llm:    infoAgent.llm,
  model:  "meta-llama/llama-4-maverick-17b-128e-instruct",
  subAgents: [infoAgent, draftAgent, psychAgent],
});

// 3) Mount under VoltAgent
new VoltAgent({
  agents: {
    supervisor,
    info:  infoAgent,
    draft: draftAgent,
    psych: psychAgent,
  },
  telemetryExporter: exporter,
});

// Handle process termination
process.on('SIGTERM', () => {
  sdk.shutdown()
    .then(() => console.log('OpenTelemetry terminated'))
    .catch((error) => console.log('Error terminating OpenTelemetry', error))
    .finally(() => process.exit(0));
});

console.log("🚀 VoltAgent server running at http://localhost:3141/ui");
