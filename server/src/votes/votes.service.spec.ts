import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { VotesService } from './votes.service';
import { VoteEntity } from './entities/vote.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ResponsesService } from '../responses/responses.service';

describe('VotesService', () => {
  let service: VotesService;
  let mockVoteRepository: Repository<VoteEntity>;
  let mockResponsesService: Partial<ResponsesService>;

  beforeEach(async () => {
    mockVoteRepository = {
      save: jest.fn(),
      delete: jest.fn(),
    } as any;

    mockResponsesService = {
      findById: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VotesService,
        {
          provide: getRepositoryToken(VoteEntity),
          useValue: mockVoteRepository,
        },
        {
          provide: ResponsesService,
          useValue: mockResponsesService,
        },
      ]
    }).compile();

    service = module.get<VotesService>(VotesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should throw BadRequestException if response does not exist', async () => {
      mockResponsesService.findById = jest.fn().mockResolvedValue(null);
      const createVoteDto = { responseId: 1 };

      await expect(service.create(createVoteDto)).rejects.toThrow(BadRequestException);
    });

    it('should call voteRepo.save if response exists', async () => {
      mockResponsesService.findById = jest.fn().mockResolvedValue({});
      const createVoteDto = { responseId: 1 };

      await service.create(createVoteDto);

      expect(mockVoteRepository.save).toHaveBeenCalledWith(createVoteDto);
    });
  });

  describe('remove', () => {
    it('should call voteRepo.delete', async () => {
      const id = 1;

      await service.remove(id);

      expect(mockVoteRepository.delete).toHaveBeenCalledWith(id);
    });
  });
});
