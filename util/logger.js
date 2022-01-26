const { createLogger, format, transports } = require("winston");
const logger = createLogger({
  format: format.combine(format.splat(), format.simple()),
  transports: [
    new transports.File({
      filename: "logs/coindirect-api-integration.log",
    }),
  ],
});

module.exports = logger;
