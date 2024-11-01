import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateVoteDto } from './dto/create-vote.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { VoteEntity } from './entities/vote.entity';
import { Repository } from 'typeorm';
import { ResponsesService } from '../responses/responses.service';

@Injectable()
export class VotesService {
  constructor(
      @InjectRepository(VoteEntity)
      private readonly voteRepo: Repository<VoteEntity>,

      private readonly responseService: ResponsesService
  ) {
  }

  async create(createVoteDto: CreateVoteDto) {
    const response = await this.responseService.findById(createVoteDto.responseId)
    if(!response) throw new BadRequestException("responseId not correct")
    return this.voteRepo.save(createVoteDto)
  }

  remove(id: number) {
    return this.voteRepo.delete(id)
  }
}
