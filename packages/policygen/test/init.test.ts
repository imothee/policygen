import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { afterEach, beforeEach, expect, test } from "vitest";

let testDir: string;

beforeEach(() => {
  // Create a temporary test directory
  testDir = path.resolve(__dirname, "test-project");
  fs.mkdirSync(testDir, { recursive: true });
  process.chdir(testDir);
});

afterEach(() => {
  // Cleanup the test directory
  fs.rmSync(testDir, { recursive: true, force: true });
});

test("should create a default policygen.json file with --default flag", () => {
  // Run the CLI command
  const cliPath = path.resolve(__dirname, "../dist/index.js");
  execFileSync(process.execPath, [cliPath, "init", "--default"], {
    cwd: testDir,
  });

  // Verify the output file
  const configPath = path.resolve(testDir, "policygen.json");
  expect(fs.existsSync(configPath)).toBe(true);

  // Verify the contents of the file
  const config = JSON.parse(fs.readFileSync(configPath, "utf-8"));
  expect(config).toHaveProperty("$schema");
  expect(config).toHaveProperty("entity");
  expect(config).toHaveProperty("privacy");
  expect(config).toHaveProperty("terms");
});
