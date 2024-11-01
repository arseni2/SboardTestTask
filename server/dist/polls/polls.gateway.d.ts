import { OnGatewayInit } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { PollsService } from './polls.service';
import { CreateVoteDto } from '../votes/dto/create-vote.dto';
export declare class PollsGateway implements OnGatewayInit {
    private readonly pollsService;
    server: Server;
    constructor(pollsService: PollsService);
    afterInit(server: Server): void;
    handleCreatePoll(createVoteDto: CreateVoteDto, client: Socket): Promise<void>;
}
