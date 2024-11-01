import { Test, TestingModule } from '@nestjs/testing';
import { VotesController } from './votes.controller';
import { VotesService } from './votes.service';
import { CreateVoteDto } from './dto/create-vote.dto';

describe('VotesController', () => {
  let controller: VotesController;
  let mockVotesService: Partial<VotesService>;

  beforeEach(async () => {
    mockVotesService = {
      create: jest.fn(),
      remove: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [VotesController],
      providers: [
        {
          provide: VotesService,
          useValue: mockVotesService,
        },
      ],
    }).compile();

    controller = module.get<VotesController>(VotesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call VotesService.create', async () => {
      const createVoteDto: CreateVoteDto = { responseId: 1 };
      await controller.create(createVoteDto);

      expect(mockVotesService.create).toHaveBeenCalledWith(createVoteDto);
    });
  });

  describe('remove', () => {
    it('should call VotesService.remove', async () => {
      const id = '1';
      await controller.remove(id);

      expect(mockVotesService.remove).toHaveBeenCalledWith(+id);
    });
  });
});
