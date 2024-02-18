import stringify from "json-stringify-safe";
import { Constructor, Environment, Level, Message, Parameters } from "./types";

class Logger {
  private static $instance: Logger;
  private readonly environment: Environment | string;

  constructor(constructor?: Constructor) {
    this.environment = constructor?.environment ?? Logger.getEnvironment();
    Logger.$instance = this;
  }

  private log(parameters: Parameters) {
    const entry: Message = {
      level: parameters.level,
      environment: this.environment,
      context: { raw: Logger.canonicalizeContext(parameters.context) },
      message: parameters.message,
      timestamp: new Date().toISOString(),
    };

    console.log(JSON.stringify(entry));
  }

  public debug(parameters: Omit<Parameters, "level">): void {
    this.log({ ...parameters, level: Level.Debug });
  }

  public info(parameters: Omit<Parameters, "level">): void {
    this.log({ ...parameters, level: Level.Info });
  }

  public warn(parameters: Omit<Parameters, "level">): void {
    this.log({ ...parameters, level: Level.Warning });
  }

  public error(parameters: Omit<Parameters, "level">): void {
    this.log({ ...parameters, level: Level.Error });
  }

  static getInstance(): Logger {
    if (Logger.$instance) {
      return Logger.$instance;
    }

    return new Logger({ environment: Logger.getEnvironment() });
  }

  private static canonicalizeContext(context: unknown): string {
    return context instanceof Error ? String(context) : stringify(context);
  }

  private static getEnvironment(): string {
    return process.env.ENVIRONMENT ?? Environment.Development;
  }
}

export default Logger;
