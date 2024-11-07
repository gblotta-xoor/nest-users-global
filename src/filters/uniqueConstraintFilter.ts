import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { MongoError } from 'mongodb';
import { Response } from 'express';

@Catch(MongoError)
export class MongoExceptionFilter implements ExceptionFilter {
  catch(exception: MongoError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    // Check for duplicate key error (code 11000)
    if (exception.code === 11000) {
      return response
        .status(HttpStatus.BAD_REQUEST)
        .json({
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Duplicate key error: Email already exists',
          error: 'Bad Request',
        });
    }

    // Default MongoDB error response
    response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Internal server error',
      error: 'Server Error',
    });
  }
}