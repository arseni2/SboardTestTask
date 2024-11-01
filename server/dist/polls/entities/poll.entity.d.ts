import { ResponseEntity } from "../../responses/entities/response.entity";
export declare class PollEntity {
    id: number;
    question: string;
    created_at: Date;
    responses: ResponseEntity[];
}
