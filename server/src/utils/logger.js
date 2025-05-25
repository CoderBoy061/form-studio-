import { createLogger, format, transports } from "winston";
import path from "path";

const logger = createLogger({
  level: "error",
  format: format.combine(
    format.timestamp(),
    format.printf(({ timestamp, level, message }) => {
      return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
    })
  ),
  transports: [
    new transports.File({ filename: path.resolve("logs", "error-log.txt") }),
    new transports.Console()
  ],
});

export default logger;
