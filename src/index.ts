import { supervisor } from "./server.js";

(async () => {
  const { text } = await supervisor.generateText(
    "Gather beginner tips for improving running speed, then output an outline, a draft paragraph, and 3 psychological hooks."
  );
  console.log("\n=== SUPERVISOR OUTPUT ===\n", text);
})();
