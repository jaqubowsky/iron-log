import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { PrismaExceptionFilter } from './prisma-exception.filter';

@Global()
@Module({
  providers: [PrismaService, PrismaExceptionFilter],
  exports: [PrismaService, PrismaExceptionFilter],
})
export class PrismaModule {}
