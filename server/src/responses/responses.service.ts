import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateResponseDto } from './dto/create-response.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ResponseEntity } from './entities/response.entity';
import { Repository } from 'typeorm';
import { UpdateResponseDto } from './dto/update-response.dto';

@Injectable()
export class ResponsesService {
    constructor(
        @InjectRepository(ResponseEntity)
        private readonly responseRepo: Repository<ResponseEntity>,
    ) {
    }

    async createMany(createResponseDtoArr: CreateResponseDto[]) {
        return this.saveEntity(createResponseDtoArr);
    }

    async create(createResponseDto: CreateResponseDto) {
        return this.saveEntity(createResponseDto);
    }

    findById(id: number) {
        return this.responseRepo.findOne({ where: { id }, transaction: false });
    }

    remove(id: number) {
        return this.responseRepo.delete(id);
    }

    update(id: number, updateResponseDto: UpdateResponseDto) {
        return this.responseRepo.update(id, updateResponseDto);
    }



    private async saveEntity(entity: CreateResponseDto | CreateResponseDto[]) {
        try {
            if (Array.isArray(entity)) {
                return await this.responseRepo.save(entity);
            } else {
                return [await this.responseRepo.save(entity)];
            }
        } catch (e) {
            throw new BadRequestException('pollId или text не правильные');
        }
    }
}
