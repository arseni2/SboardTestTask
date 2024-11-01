import { VoteEntity } from "../../votes/entities/vote.entity";
import { PollEntity } from '../../polls/entities/poll.entity';
export declare class ResponseEntity {
    id: number;
    poll: PollEntity;
    pollId?: number;
    text: string;
    created_at: Date;
    votes: VoteEntity[];
}
