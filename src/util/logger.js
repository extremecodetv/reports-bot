const winston = require('winston');
const path = require('path');

module.exports = (module) => {
    const getLabel = (fileinfo) => {
        return fileinfo.filename.split(path.sep).slice(-2).join(path.sep);
    };

    const logsPath = path.join(process.cwd(), './logs');
    const logger = winston.createLogger({
        level: 'info',
        format: winston.format.json(),
        label: getLabel(module),
        transports: [
            new winston.transports.File({ filename: path.join(logsPath, 'error.log'), level: 'error' }),
            new winston.transports.File({ filename: path.join(logsPath, 'combined.log') })
        ]
    });

    if (process.env.NODE_ENV !== 'production') {
        logger.add(new winston.transports.Console({
            format: winston.format.simple()
        }));
    }

    return logger;
};
