import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePollDto } from './dto/create-poll.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PollEntity } from './entities/poll.entity';
import { Repository } from 'typeorm';
import { ResponsesService } from '../responses/responses.service';
import { VotesService } from '../votes/votes.service';
import { CreateVoteDto } from '../votes/dto/create-vote.dto';

@Injectable()
export class PollsService {
    constructor(
        @InjectRepository(PollEntity)
        private readonly pollRepo: Repository<PollEntity>,
        private readonly responseService: ResponsesService,
        private readonly voteService: VotesService,
    ) {
    }

    async create(createPollDto: CreatePollDto) {
        let responses = null;
        if (createPollDto.responses) {
            try {
                responses = await this.responseService.createMany(createPollDto.responses);
            } catch (e) {
                throw new BadRequestException('Не удалось создать responses');
            }
        }
        return this.pollRepo.save({ ...createPollDto, responses });
    }

    async findAll(page: number, limit: number) {
        const [result, total] = await this.pollRepo.findAndCount({
            skip: (page - 1) * limit,
            take: limit,
            relations: {
                responses: {
                    votes: true,
                },
            },
        });

        return {
            data: result,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
    }

    async createVote(createVoteDto: CreateVoteDto) {
        const vote = await this.voteService.create(createVoteDto);
        const response = await this.responseService.findById(vote.responseId);
        return this.pollRepo.findOne({
            where: { id: response.pollId },
            transaction: false,
            relations: { responses: { votes: true } },
        });
    }

    remove(id: number) {
        return this.pollRepo.delete(id);
    }
}
