import { CreateResponseDto } from './dto/create-response.dto';
import { ResponseEntity } from './entities/response.entity';
import { Repository } from 'typeorm';
import { UpdateResponseDto } from './dto/update-response.dto';
export declare class ResponsesService {
    private readonly responseRepo;
    constructor(responseRepo: Repository<ResponseEntity>);
    createMany(createResponseDtoArr: CreateResponseDto[]): Promise<(CreateResponseDto & ResponseEntity)[]>;
    create(createResponseDto: CreateResponseDto): Promise<(CreateResponseDto & ResponseEntity)[]>;
    findById(id: number): Promise<ResponseEntity>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
    update(id: number, updateResponseDto: UpdateResponseDto): Promise<import("typeorm").UpdateResult>;
    private saveEntity;
}
