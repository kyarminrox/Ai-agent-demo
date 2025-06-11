import "./server.js";        // ensures the server is up
import { supervisor } from "./server.js";

(async () => {
  try {
    console.log("Starting pipeline...");
    const { text } = await supervisor.generateText(
      "Create a comprehensive guide about beginner tips for improving running speed. " +
      "Include practical advice, common mistakes to avoid, and a training schedule."
    );
    
    console.log("\n=== FINAL OUTPUT ===\n");
    console.log(text);
    console.log("\n=== END OF OUTPUT ===\n");
  } catch (e: any) {
    console.error("Pipeline error:", e.message);
    if (e.stack) console.error(e.stack);
  }
})();
