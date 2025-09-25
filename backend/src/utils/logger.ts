import { config } from '../config/environment';

export enum LogLevel {
  ERROR = 0,
  WARN = 1,
  INFO = 2,
  DEBUG = 3,
}

class Logger {
  private level: LogLevel;

  constructor() {
    this.level = config.NODE_ENV === 'production' ? LogLevel.INFO : LogLevel.DEBUG;
  }

  private formatMessage(level: string, message: string, data?: any): string {
    const timestamp = new Date().toISOString();
    let logMessage = `[${timestamp}] ${level.toUpperCase()}: ${message}`;
    
    if (data) {
      logMessage += ` ${JSON.stringify(data, null, 2)}`;
    }
    
    return logMessage;
  }

  private shouldLog(level: LogLevel): boolean {
    return level <= this.level;
  }

  error(message: string, error?: any): void {
    if (this.shouldLog(LogLevel.ERROR)) {
      const formattedMessage = this.formatMessage('error', message, error);
      console.error(formattedMessage);
    }
  }

  warn(message: string, data?: any): void {
    if (this.shouldLog(LogLevel.WARN)) {
      const formattedMessage = this.formatMessage('warn', message, data);
      console.warn(formattedMessage);
    }
  }

  info(message: string, data?: any): void {
    if (this.shouldLog(LogLevel.INFO)) {
      const formattedMessage = this.formatMessage('info', message, data);
      console.info(formattedMessage);
    }
  }

  debug(message: string, data?: any): void {
    if (this.shouldLog(LogLevel.DEBUG)) {
      const formattedMessage = this.formatMessage('debug', message, data);
      console.debug(formattedMessage);
    }
  }

  // HTTP request logging
  http(method: string, url: string, statusCode: number, responseTime: number): void {
    const message = `${method} ${url} ${statusCode} - ${responseTime}ms`;
    
    if (statusCode >= 500) {
      this.error(message);
    } else if (statusCode >= 400) {
      this.warn(message);
    } else {
      this.info(message);
    }
  }

  // Database operation logging
  database(operation: string, table: string, duration?: number, error?: any): void {
    const message = `DB ${operation} on ${table}${duration ? ` (${duration}ms)` : ''}`;
    
    if (error) {
      this.error(message, error);
    } else {
      this.debug(message);
    }
  }

  // API service logging
  service(serviceName: string, operation: string, success: boolean, duration?: number, error?: any): void {
    const message = `${serviceName} ${operation}${duration ? ` (${duration}ms)` : ''}`;
    
    if (!success) {
      this.error(message, error);
    } else {
      this.debug(message);
    }
  }
}

export const logger = new Logger();