import { Test, TestingModule } from '@nestjs/testing';
import { ResponsesService } from './responses.service';
import { Repository } from 'typeorm';
import { ResponseEntity } from './entities/response.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateResponseDto } from './dto/create-response.dto';
import { BadRequestException } from '@nestjs/common';
import { UpdateResponseDto } from './dto/update-response.dto';


describe('ResponsesService', () => {
  let service: ResponsesService;
  let responseRepo: Repository<ResponseEntity>;

  const mockResponseRepo = {
    save: jest.fn(),
    findOne: jest.fn(),
    delete: jest.fn(),
    update: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ResponsesService,
        {
          provide: getRepositoryToken(ResponseEntity),
          useValue: mockResponseRepo,
        },
      ],
    }).compile();

    service = module.get<ResponsesService>(ResponsesService);
    responseRepo = module.get<Repository<ResponseEntity>>(getRepositoryToken(ResponseEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a response', async () => {
    const dto: CreateResponseDto = { pollId: 1, text: "text" };
    mockResponseRepo.save.mockResolvedValue(dto);

    const result = await service.create(dto);
    expect(result).toEqual([dto]);
    expect(mockResponseRepo.save).toHaveBeenCalledWith(dto);
  });

  it('should throw BadRequestException on save error', async () => {
    const dto: CreateResponseDto = { pollId: -1, text: "text" };
    mockResponseRepo.save.mockRejectedValue(new Error());

    await expect(service.create(dto)).rejects.toThrow(BadRequestException);
  });

  it('should find a response by id', async () => {
    const id = 1;
    const response = { id,  };
    mockResponseRepo.findOne.mockResolvedValue(response);

    const result = await service.findById(id);
    expect(result).toEqual(response);
    expect(mockResponseRepo.findOne).toHaveBeenCalledWith({ where: { id }, transaction: false });
  });

  it('should delete a response by id', async () => {
    const id = 1;

    await service.remove(id);
    expect(mockResponseRepo.delete).toHaveBeenCalledWith(id);
  });

  it('should update a response', async () => {
    const id = 1;
    const dto: UpdateResponseDto = { text: "tetx updated" };

    await service.update(id, dto);
    expect(mockResponseRepo.update).toHaveBeenCalledWith(id, dto);
  });
});