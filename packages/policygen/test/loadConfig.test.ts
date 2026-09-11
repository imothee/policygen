import fs from "node:fs";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import {
  defaultEntityConfig,
  defaultOutputConfig,
  defaultTermsConfig,
} from "../src/config";
import { loadConfig } from "../src/utils/loadConfig";

describe("loadConfig", () => {
  const originalCwd = process.cwd();
  let testDir: string;

  beforeEach(() => {
    testDir = path.resolve(__dirname, "test-config");
    fs.mkdirSync(testDir, { recursive: true });
    process.chdir(testDir);
  });

  afterEach(() => {
    process.chdir(originalCwd);
    fs.rmSync(testDir, { recursive: true, force: true });
  });

  test("returns default config when no config file exists", () => {
    const consoleSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
    const config = loadConfig();
    expect(config.entity).toBeDefined();
    expect(config.output).toBeDefined();
    consoleSpy.mockRestore();
  });

  test("throws error when $schema field is missing", () => {
    const configPath = path.resolve(testDir, "policygen.json");
    fs.writeFileSync(
      configPath,
      JSON.stringify({
        entity: { name: "Test", website: "https://test.com", address: "" },
        output: { fileType: "html", cssFramework: "tailwind", locales: ["en"] },
      }),
    );

    expect(() => loadConfig()).toThrow(
      "Config file is missing the `$schema` field.",
    );
  });

  test("throws error when $schema format is invalid", () => {
    const configPath = path.resolve(testDir, "policygen.json");
    fs.writeFileSync(
      configPath,
      JSON.stringify({
        $schema: "invalid-url",
        entity: { name: "Test", website: "https://test.com", address: "" },
        output: { fileType: "html", cssFramework: "tailwind", locales: ["en"] },
      }),
    );

    expect(() => loadConfig()).toThrow("Invalid `$schema` field format.");
  });

  test("preserves defaults omitted from a configured nested group", () => {
    const terms = {
      ...defaultTermsConfig,
      liabilityLimitation: true,
      liabilityLimitationTimeframe: undefined,
    };
    fs.writeFileSync(
      path.resolve(testDir, "policygen.json"),
      JSON.stringify({
        $schema: "https://policygen.xyz/schemas/0.7/schema.json",
        output: defaultOutputConfig,
        entity: defaultEntityConfig,
        terms,
      }),
    );

    expect(loadConfig().terms?.liabilityLimitationTimeframe).toBe(
      "twelve (12) months",
    );
  });
});
