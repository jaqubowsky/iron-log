import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { PrismaClientKnownRequestError } from 'prisma/generated/prisma/internal/prismaNamespace';

type PrismaError = 'P2000' | 'P2002' | 'P2025';

@Catch(PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
  private readonly defaultMapping: Record<PrismaError, HttpStatus> = {
    P2000: HttpStatus.BAD_REQUEST,
    P2002: HttpStatus.CONFLICT,
    P2025: HttpStatus.NOT_FOUND,
  };

  private isPrismaExceptionCode(
    exceptionCode: string,
  ): exceptionCode is PrismaError {
    if (exceptionCode in this.defaultMapping) return true;

    return false;
  }

  private statusCode(exception: PrismaClientKnownRequestError): number {
    if (!this.isPrismaExceptionCode(exception.code)) {
      return HttpStatus.INTERNAL_SERVER_ERROR;
    }

    return this.defaultMapping[exception.code];
  }

  private buildMessage(exception: PrismaClientKnownRequestError) {
    if (!this.isPrismaExceptionCode(exception.code)) {
      return 'Internal server error';
    }

    switch (exception.code) {
      case 'P2000': {
        return 'Bad request. Please check your request data.';
      }
      case 'P2002': {
        return 'There are some violating fields. Please check your request data.';
      }
      case 'P2025': {
        return 'Resource not found. Please check your request data.';
      }
      default: {
        const _exhaustive: never = exception.code;
        return _exhaustive;
      }
    }
  }

  catch(exception: PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status = this.statusCode(exception);
    const message = this.buildMessage(exception);

    response.status(status).json({
      statusCode: status,
      message,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
