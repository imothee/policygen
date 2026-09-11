import fs from "node:fs";
import path from "node:path";
import Ajv from "ajv";
import { defaultConfig, type PolicygenConfig } from "../config";

// Get the current version from package.json
const currentVersion = require("../../package.json").version || "0.0.0";
const [currentMajor, currentMinor] = currentVersion.split(".");

const ajv = new Ajv();

export function loadConfig(): PolicygenConfig {
  const configPath = path.resolve(process.cwd(), "policygen.json");

  if (!fs.existsSync(configPath)) {
    console.warn("⚠️ Config file not found. Using defaults.");
    return defaultConfig;
  }

  const raw = fs.readFileSync(configPath, "utf-8");
  const parsed = JSON.parse(raw) as Partial<PolicygenConfig>; // Allow $schema as an extra field

  // Get the schema version from the `$schema` field
  const schemaUrl = parsed.$schema;
  if (!schemaUrl) {
    throw new Error("Config file is missing the `$schema` field.");
  }

  // Extract the schema version from the `$schema` URL
  const schemaVersionMatch = schemaUrl.match(/schemas\/(\d+)\.(\d+)\//);
  if (!schemaVersionMatch) {
    throw new Error("Invalid `$schema` field format.");
  }
  const [schemaMajor, schemaMinor] = schemaVersionMatch.slice(1, 3);

  // Check if the schema version matches the current version
  if (schemaMajor !== currentMajor || schemaMinor !== currentMinor) {
    console.warn(
      `⚠️ Schema version (${schemaMajor}.${schemaMinor}) does not match the current version (${currentMajor}.${currentMinor}).`,
    );
  }

  // Use the schema from the dist folder
  const schemaPath = path.resolve(__dirname, "../../dist/config_schema.json");
  if (!fs.existsSync(schemaPath)) {
    throw new Error(`Schema file not found at ${schemaPath}`);
  }

  // Load and validate the schema
  const configSchema = JSON.parse(fs.readFileSync(schemaPath, "utf-8"));
  const validate = ajv.compile(configSchema);
  if (!validate(parsed)) {
    throw new Error(`Invalid config: ${JSON.stringify(validate.errors)}`);
  }

  // Merge the validated config with the default config and return it.
  // Deep-merge nested groups (output / entity / privacy / terms) so optional
  // fields fall through to defaults instead of being dropped by a shallow
  // spread when the user supplies any other field in the same group.
  return mergeConfig(defaultConfig, parsed) as PolicygenConfig;
}

function mergeConfig(
  defaults: Record<string, unknown>,
  user: Record<string, unknown>,
): Record<string, unknown> {
  const merged: Record<string, unknown> = { ...defaults };
  for (const key of Object.keys(user)) {
    const userVal = user[key];
    const defaultVal = defaults[key];
    if (
      userVal !== null &&
      typeof userVal === "object" &&
      !Array.isArray(userVal) &&
      defaultVal !== null &&
      typeof defaultVal === "object" &&
      !Array.isArray(defaultVal)
    ) {
      merged[key] = mergeConfig(
        defaultVal as Record<string, unknown>,
        userVal as Record<string, unknown>,
      );
    } else {
      merged[key] = userVal;
    }
  }
  return merged;
}
