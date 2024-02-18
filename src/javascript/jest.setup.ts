import mockDate from "mockdate";

export const mockConsoleLog: jest.SpyInstance = jest.spyOn(console, "log").mockImplementation(jest.fn());

mockDate.set("1970-01-01T00:00:00.000Z");
