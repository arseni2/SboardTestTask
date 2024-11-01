import { ResponsesService } from './responses.service';
import { CreateResponseDto } from './dto/create-response.dto';
import { UpdateResponseDto } from './dto/update-response.dto';
export declare class ResponsesController {
    private readonly responsesService;
    constructor(responsesService: ResponsesService);
    create(createResponseDto: CreateResponseDto): Promise<(CreateResponseDto & import("./entities/response.entity").ResponseEntity)[]>;
    update(id: string, updateResponseDto: UpdateResponseDto): Promise<import("typeorm").UpdateResult>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
