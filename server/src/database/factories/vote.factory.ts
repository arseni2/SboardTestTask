import {define} from 'typeorm-seeding';
import {VoteEntity} from 'src/votes/entities/vote.entity';

define(VoteEntity, () => {
	return new VoteEntity();
});