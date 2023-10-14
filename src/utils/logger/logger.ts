import * as winston from "winston";
import _ from "lodash";
import { attachLog } from "../reporter/reporter.js";

type logLevels = "info" | "error";

class Logger {
  private logArray: string[] = [];
  private static instance: Logger;
  private logger = winston.createLogger({
    level: "info",
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.timestamp(),
      winston.format.printf(({ timestamp, level, message }) => `${timestamp} [${level}]: ${message}`)
    ),
    transports: [new winston.transports.Console()],
  });

  constructor() {
    if (Logger.instance) {
      return Logger.instance;
    }
    Logger.instance = this;
  }

  log(message: string, level: logLevels = "info") {
    const logEntry = `${new Date().toISOString()} [${level.toUpperCase()}]: ${message}`;
    this.logArray.push(logEntry);
    this.logger.log({ level, message });
  }

  logApiRequest(requestInfo: string) {
    this.log(`API Request: ${requestInfo}`);
  }

  logApiResponse(responseInfo: string) {
    this.log(`API Response: ${responseInfo}`);
  }

  sendLogsToReport() {
    const log = this.logArray.join("\n");
    attachLog(log);
    this.clearLogs();
  }

  clearLogs() {
    _.remove(this.logArray);
  }
}

export default new Logger();
