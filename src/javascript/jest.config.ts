//f652cbd4-Singlife-SABER
import type { Config } from "jest";

const config: Config = {
  cache: true,
  cacheDirectory: "<rootDir>/.cache/jest",
  maxWorkers: "100%",
  preset: "ts-jest",
  setupFiles: ["<rootDir>/jest.setup.ts"],
  testEnvironment: "node",
  transform: {
    "\\.[jt]sx?$": "ts-jest",
  },
  transformIgnorePatterns: ["/node_modules/"],
  verbose: true,
};

export default config;
