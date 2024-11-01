import { CreateVoteDto } from './dto/create-vote.dto';
import { VoteEntity } from './entities/vote.entity';
import { Repository } from 'typeorm';
import { ResponsesService } from '../responses/responses.service';
export declare class VotesService {
    private readonly voteRepo;
    private readonly responseService;
    constructor(voteRepo: Repository<VoteEntity>, responseService: ResponsesService);
    create(createVoteDto: CreateVoteDto): Promise<CreateVoteDto & VoteEntity>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}
