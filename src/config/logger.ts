import { configure, getLogger } from 'log4js';

export default class Logger {
  log = getLogger();
  constructor() {
    this.setLoggerConfiguration();
  }

  private setLoggerConfiguration(): void {
    configure({
      appenders: {
        console: {
          type: 'console',
          category: 'console',
        },
        out: { type: 'stdout' },
      },
      categories: {
        default: { appenders: ['console'], level: 'info' },
      },
    });
  }
}
