type LogLevel = "DEBUG" | "INFO" | "WARNING" | "ERROR";

interface Logger {
  debug: (message: string) => void;
  info: (message: string) => void;
  warning: (message: string) => void;
  error: (message: string) => void;
}

interface LoggerOptions {
  level?: LogLevel;
  format?: (level: LogLevel, message: string) => string;
}

function createLogger(options: LoggerOptions = {}): Logger {
  const {
    level: defaultLevel = "INFO",
    format = (level, message) => `[${level}] ${message}`,
  } = options;

  function log(level: LogLevel, message: string): void {
    if (
      ["DEBUG", "INFO", "WARNING", "ERROR"].indexOf(level) >=
      ["DEBUG", "INFO", "WARNING", "ERROR"].indexOf(defaultLevel)
    ) {
      const formattedMessage = format(level, message);
      console.log(formattedMessage);
    }
  }

  return {
    debug: (message: string) => log("DEBUG", message),
    info: (message: string) => log("INFO", message),
    warning: (message: string) => log("WARNING", message),
    error: (message: string) => log("ERROR", message),
  };
}

const createLogService = () => {
  const rootLogger = createLogger();
  return {
    debug: rootLogger.debug,
    info: rootLogger.info,
    warning: rootLogger.warning,
    error: rootLogger.error,
    createLogger,
  };
};

export const logService = createLogService();
