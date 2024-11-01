import { CreateResponseDto } from "../../responses/dto/create-response.dto";
export declare class CreatePollDto {
    question: string;
    responses?: CreateResponseDto[];
}
