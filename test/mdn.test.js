import fs from "node:fs";
import { execSync } from "node:child_process";
import path from "node:path";
import { describe, it, before, after } from "node:test";
import assert from "node:assert";
import config from "./config.js"; // Import central config

const { testUrl, expectedOutputPath } = config.mdn; // Get MDN specific config

// Removed extractMarkdownContent function as frontmatter is no longer generated

describe("web2llm.js E2E tests with Kadoa API", () => {
  const outputFileName = "test-output.md"; // Temporary file generated by the test
  const actualOutputPath = path.resolve(process.cwd(), outputFileName); // Output file in root CWD
  // expectedOutputPath is imported from config

  const cleanup = () => {
    if (fs.existsSync(actualOutputPath)) {
      fs.unlinkSync(actualOutputPath);
    }
  };

  // Clean up before tests run (in case previous run failed)
  before(cleanup);

  // Clean up after tests run
  after(cleanup);

  it("should generate correct markdown with links kept when --href is used and crawling is restricted to start URL", () => {
    // Added --href flag and explicit -c for default crawl behavior
    const command = `node web2llm.js -u "${testUrl}" -c "${testUrl}" --href -o ${outputFileName}`;

    try {
      // Execute the crawl command
      // Increased timeout for Kadoa API calls
      execSync(command, { encoding: "utf-8", timeout: 300000 }); // 5 minutes timeout

      // Check if the output file was created
      assert.ok(
        fs.existsSync(actualOutputPath),
        `Output file ${outputFileName} was not created.`
      );

      // Read expected and actual content
      const expectedContent = fs.readFileSync(expectedOutputPath, "utf-8");
      const actualContent = fs.readFileSync(actualOutputPath, "utf-8");

      // Compare the raw content directly
      assert.strictEqual(
        actualContent.trim(), // Trim to remove potential trailing whitespace differences
        expectedContent.trim(), // Trim to remove potential trailing whitespace differences
        "Generated markdown does not match expected markdown."
      );
    } catch (error) {
      // Log error details for easier debugging
      console.error("Test failed during execution:", error);
      if (error.stdout) console.error("STDOUT:", error.stdout);
      if (error.stderr) console.error("STDERR:", error.stderr);
      // Re-throw the error to fail the test using assert.fail
      assert.fail(`Test execution failed: ${error.message}`);
    }
  });
});
