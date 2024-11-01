import { Module } from '@nestjs/common';
import { ResponsesService } from './responses.service';
import { ResponsesController } from './responses.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ResponseEntity} from "./entities/response.entity";

@Module({
  controllers: [ResponsesController],
  providers: [ResponsesService],
  imports: [TypeOrmModule.forFeature([ResponseEntity])],
  exports: [ResponsesService]
})
export class ResponsesModule {}
