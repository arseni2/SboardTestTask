import { VotesService } from './votes.service';
import { CreateVoteDto } from './dto/create-vote.dto';
export declare class VotesController {
    private readonly votesService;
    constructor(votesService: VotesService);
    create(createVoteDto: CreateVoteDto): Promise<CreateVoteDto & import("./entities/vote.entity").VoteEntity>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
