import {CreateResponseDto} from "../../responses/dto/create-response.dto";

export class CreatePollDto {
	question: string;

	responses?: CreateResponseDto[]
}
