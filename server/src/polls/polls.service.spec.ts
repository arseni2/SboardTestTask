import { Test, TestingModule } from '@nestjs/testing';
import { PollsService } from './polls.service';
import { Repository } from 'typeorm';
import { PollEntity } from './entities/poll.entity';
import { ResponsesService } from '../responses/responses.service';
import { VotesService } from '../votes/votes.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreatePollDto } from './dto/create-poll.dto';

describe('PollsService', () => {
  let service: PollsService;
  let pollRepo: Repository<PollEntity>;
  let responseService: ResponsesService;
  let voteService: VotesService;

  const mockPollRepo = {
    save: jest.fn(),
    findAndCount: jest.fn(),
    delete: jest.fn(),
  };

  const mockResponseService = {
    createMany: jest.fn(),
    findById: jest.fn(),
  };

  const mockVoteService = {
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PollsService,
        {
          provide: getRepositoryToken(PollEntity),
          useValue: mockPollRepo,
        },
        {
          provide: ResponsesService,
          useValue: mockResponseService,
        },
        {
          provide: VotesService,
          useValue: mockVoteService,
        },
      ],
    }).compile();

    service = module.get<PollsService>(PollsService);
    pollRepo = module.get<Repository<PollEntity>>(getRepositoryToken(PollEntity));
    responseService = module.get<ResponsesService>(ResponsesService);
    voteService = module.get<VotesService>(VotesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a poll', async () => {
    const dto: CreatePollDto = { question: "test", responses: [] };
    mockResponseService.createMany.mockResolvedValue([]);
    mockPollRepo.save.mockResolvedValue(dto);

    const result = await service.create(dto);
    expect(result).toEqual({ ...dto, responses: [] });
    expect(mockResponseService.createMany).toHaveBeenCalledWith(dto.responses);
    expect(mockPollRepo.save).toHaveBeenCalledWith({ ...dto, responses: [] });
  });

  it('should return all polls', async () => {
    const page = 1;
    const limit = 10;
    const polls = [{ id: 1, question: 'Poll 1' }];
    const total = 1;
    mockPollRepo.findAndCount.mockResolvedValue([polls, total]);

    const result = await service.findAll(page, limit);
    expect(result).toEqual({
      data: polls,
      total,
      page,
      limit,
      totalPages: 1,
    });
    expect(mockPollRepo.findAndCount).toHaveBeenCalledWith({
      skip: (page - 1) * limit,
      take: limit,
      relations: { responses: { votes: true } },
    });
  });

  it('should remove a poll by id', async () => {
    const id = 1;

    await service.remove(id);
    expect(mockPollRepo.delete).toHaveBeenCalledWith(id);
  });
});