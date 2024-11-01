import { CreatePollDto } from './dto/create-poll.dto';
import { PollEntity } from './entities/poll.entity';
import { Repository } from 'typeorm';
import { ResponsesService } from '../responses/responses.service';
import { VotesService } from '../votes/votes.service';
import { CreateVoteDto } from '../votes/dto/create-vote.dto';
export declare class PollsService {
    private readonly pollRepo;
    private readonly responseService;
    private readonly voteService;
    constructor(pollRepo: Repository<PollEntity>, responseService: ResponsesService, voteService: VotesService);
    create(createPollDto: CreatePollDto): Promise<{
        responses: any;
        question: string;
    } & PollEntity>;
    findAll(page: number, limit: number): Promise<{
        data: PollEntity[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    createVote(createVoteDto: CreateVoteDto): Promise<PollEntity>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}
