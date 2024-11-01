import { Module } from '@nestjs/common';
import { PollsService } from './polls.service';
import { PollsController } from './polls.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {PollEntity} from "./entities/poll.entity";
import {ResponsesModule} from "../responses/responses.module";
import { VotesModule } from '../votes/votes.module';
import { PollsGateway } from './polls.gateway';

@Module({
  controllers: [PollsController],
  providers: [PollsService, PollsGateway],
  imports: [TypeOrmModule.forFeature([PollEntity]), ResponsesModule, VotesModule]
})
export class PollsModule {}
