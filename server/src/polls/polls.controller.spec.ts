import { Test, TestingModule } from '@nestjs/testing';
import { PollsController } from './polls.controller';
import { PollsService } from './polls.service';
import { CreatePollDto } from './dto/create-poll.dto';

describe('PollsController', () => {
  let controller: PollsController;
  let service: PollsService;

  const mockService = {
    create: jest.fn(),
    findAll: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PollsController],
      providers: [
        {
          provide: PollsService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<PollsController>(PollsController);
    service = module.get<PollsService>(PollsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a poll', async () => {
    const dto: CreatePollDto = { question: "question" };
    mockService.create.mockResolvedValue(dto);

    const result = await controller.create(dto);
    expect(result).toEqual(dto);
    expect(mockService.create).toHaveBeenCalledWith(dto);
  });

  it('should return all polls', async () => {
    const page = 1;
    const limit = 10;
    const result = { data: [], total: 0, page, limit, totalPages: 1 };
    mockService.findAll.mockResolvedValue(result);

    const response = await controller.findAll(page, limit);
    expect(response).toEqual(result);
    expect(mockService.findAll).toHaveBeenCalledWith(page, limit);
  });

  it('should remove a poll', async () => {
    const id = '1';

    await controller.remove(id);
    expect(mockService.remove).toHaveBeenCalledWith(+id);
  });
});
