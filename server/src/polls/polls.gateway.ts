import { ConnectedSocket, MessageBody, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { PollsService } from './polls.service';
import { CreateVoteDto } from '../votes/dto/create-vote.dto';

@WebSocketGateway({cors: true})
export class PollsGateway implements OnGatewayInit {
    @WebSocketServer()
    server: Server;

    constructor(private readonly pollsService: PollsService) {}

    afterInit(server: Server) {
        console.log('WebSocket server initialized');
    }

    @SubscribeMessage('createPoll')
    async handleCreatePoll(@MessageBody() createVoteDto: CreateVoteDto, @ConnectedSocket() client: Socket) {
        const newPoll = await this.pollsService.createVote(createVoteDto);
        this.server.emit('pollCreated', newPoll);
    }
}
