import { Test, TestingModule } from '@nestjs/testing';
import { ResponsesController } from './responses.controller';
import { ResponsesService } from './responses.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ResponseEntity } from './entities/response.entity';

describe('ResponsesController', () => {
  let controller: ResponsesController;
  let service: ResponsesService;

  const mockResponseRepo = {
    save: jest.fn(),
    findOne: jest.fn(),
    delete: jest.fn(),
    update: jest.fn(),
  };

  const mockResponsesService = {
    create: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
    findById: jest.fn(),
    createMany: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ResponsesController],
      providers: [
        {
          provide: ResponsesService,
          useValue: mockResponsesService,
        },
        {
          provide: getRepositoryToken(ResponseEntity),
          useValue: mockResponseRepo,
        },
      ],
    }).compile();

    controller = module.get<ResponsesController>(ResponsesController);
    service = module.get<ResponsesService>(ResponsesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
