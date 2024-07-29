// Create an iunjectable nestjs logger service that can be used in the entire application 
// should be able to log to the console and to a file
// The logger should have the following methods:
// - log
// - error
// - warn
// - debug
// - verbose
// The logger should have the following configuration options:
// - log level
// - log file location
// - log file name
// - log file max size
// - log file max number of files
// - log to console

import { Injectable, LoggerService } from '@nestjs/common';
import * as winston from 'winston';
import * as path from 'path';
import * as fs from 'fs';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class AppLogger implements LoggerService {
    private logger: winston.Logger;

    constructor(private configService: ConfigService) {
        this.logger = winston.createLogger({
            level: 'info',
            format: winston.format.json(),
            transports: [
                new winston.transports.File({
                    filename: path.join(this.configService.get<string>('LOG_PATH'), 'error.log'),
                    level: 'error',
                    maxsize: 5242880,
                    maxFiles: 5
                }),
                new winston.transports.File({
                    filename: path.join(this.configService.get<string>('LOG_PATH'), 'combined.log'),
                    maxsize: 5242880,
                    maxFiles: 5
                })
            ]
        });

        if (this.configService.get<boolean>('LOG_TO_CONSOLE')) {
            this.logger.add(new winston.transports.Console({
                format: winston.format.simple()
            }));
        }
    }

    log(message: string) {
        this.logger.log('info', message
        );
    }

    error(message: string, trace: string) {
        this.logger.error(message, trace);
    }


    warn(message: string) {
        this.logger.warn(message);
    }

    debug(message: string) {
        this.logger.debug(message);
    }

    verbose(message: string) {
        this.logger.verbose(message);
    }

}