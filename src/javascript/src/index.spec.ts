import Logger from "./index";
import { Environment } from "./types";
import { mockConsoleLog } from "../jest.setup";

describe("Logger.constructor", () => {
  // when
  beforeAll(() => {
    new Logger({ environment: "test-environment" }).info({ message: "test-message" });
  });

  it("Should use constructor overrides on explicit specify", () => {
    expect(mockConsoleLog.mock.calls).toMatchSnapshot();
  });

  afterAll(jest.clearAllMocks);
});

describe("Logger.constructor", () => {
  // given
  beforeAll(() => {
    Object.assign(process.env, { ENVIRONMENT: "test-env-environment" });
  });

  // when
  beforeAll(() => {
    new Logger().info({ message: "test-message" });
  });

  it("Should use environment variable overrides when available", () => {
    expect(mockConsoleLog.mock.calls).toMatchSnapshot();
  });

  afterAll(() => {
    Object.assign(process.env, { ENVIRONMENT: null });
    jest.clearAllMocks();
  });
});

describe("Logger.getInstance", () => {
  let logger: Logger;

  // given
  beforeAll(() => {
    logger = new Logger({ environment: Environment.Staging });
  });

  // then
  it("Should return singleton logger instance", () => {
    expect(Logger.getInstance()).toBe(logger);
  });

  afterAll(jest.clearAllMocks);
});

describe.each(["debug", "error", "info", "warn"])("Logger.prototype.%s", (level: string) => {
  const logger: Logger = Logger.getInstance();

  // when
  beforeAll(() => {
    logger[level]({ message: "test-message", context: "text-context" });
  });

  // then
  it(`Should log ${level} level entry with valid arity`, () => {
    expect(mockConsoleLog.mock.calls).toMatchSnapshot();
  });

  afterAll(jest.clearAllMocks);
});
