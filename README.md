# Ai-agent-demo

This project demonstrates a multi-agent orchestration pipeline using [VoltAgent](https://voltagent.ai/). It features a supervisor agent that coordinates three specialized sub-agents to process user requests in a modular, observable, and extensible way.

## Features
- **Supervisor agent**: Orchestrates the workflow and delegates tasks to sub-agents.
- **Info Collector**: Gathers information and creates an outline.
- **Draft Writer**: Writes a draft based on the outline.
- **Psych Hooks Specialist**: Suggests psychological hooks to enhance the content.
- **OpenTelemetry integration**: For tracing and observability.
![image](https://github.com/user-attachments/assets/07cbcdcc-4ecd-4d2f-854a-38c40f3c5525)

## Project Structure
```
├── src/
│   ├── agents.ts        # Sub-agent definitions
│   ├── server.ts        # Supervisor agent, orchestration, and server setup
│   ├── pipeline.ts      # Example pipeline runner
│   └── index.ts         # Entry point for running a sample pipeline
├── .env                 # Environment variables (not committed)
├── package.json         # Scripts and dependencies
└── README.md            # This file
```

## Setup
1. **Clone the repo**
2. **Install dependencies**
   ```sh
   npm install
   ```
3. **Create a `.env` file** in the project root with your API keys:
   ```env
   GROQ_API_KEY=your-groq-api-key-here
   VOLTAGENT_PUBLIC_KEY=your-voltagent-public-key-here
   VOLTAGENT_SECRET_KEY=your-voltagent-secret-key-here
   ```

## Usage
- **Run the server:**
  ```sh
  npm run dev:server
  ```
  The VoltAgent server will start and be accessible at [http://localhost:3141/ui](http://localhost:3141/ui) (or another port if 3141 is in use).

- **Run the pipeline example:**
  ```sh
  npm run dev:pipe
  ```
  This will execute a sample prompt through the supervisor agent, which delegates to the sub-agents and prints the final output.
![image](https://github.com/user-attachments/assets/45d91a02-a65e-47f5-b1c4-49098d7658d1)

## Notes
- The current setup uses the Groq Meta-Llama model for all agents. If you want true agent orchestration (where the supervisor actually delegates to sub-agents), use an OpenAI GPT-4 model for the supervisor.
- Observability is enabled via OpenTelemetry and VoltAgent's exporter.

## Extending
- Add new sub-agents in `src/agents.ts` and register them with the supervisor in `src/server.ts`.
- Modify prompts and orchestration logic as needed for your use case.

## License
MIT 
