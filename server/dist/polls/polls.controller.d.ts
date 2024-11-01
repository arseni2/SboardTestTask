import { PollsService } from './polls.service';
import { CreatePollDto } from './dto/create-poll.dto';
export declare class PollsController {
    private readonly pollsService;
    constructor(pollsService: PollsService);
    create(createPollDto: CreatePollDto): Promise<{
        responses: any;
        question: string;
    } & import("./entities/poll.entity").PollEntity>;
    findAll(page?: number, limit?: number): Promise<{
        data: import("./entities/poll.entity").PollEntity[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
