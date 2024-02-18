export enum Level {
  Info = "INFO",
  Warning = "WARNING",
  Debug = "DEBUG",
  Error = "ERROR",
}

export enum Environment {
  Development = "DEVELOPMENT",
  Staging = "STAGING",
  Production = "PRODUCTION",
}

export interface Context {
  raw: string;
}

export interface Constructor {
  environment?: Environment | string;
}

export interface Parameters {
  level: Level;
  message: string;
  context?: unknown;
}

export interface Message {
  level: Level;
  timestamp: string;
  message: string;
  context: Context;
  environment: string;
}
