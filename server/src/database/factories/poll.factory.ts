import { define } from 'typeorm-seeding';
import {PollEntity} from "../../polls/entities/poll.entity";
import { faker } from '@faker-js/faker/locale/ru';

define(PollEntity, () => {
	const poll = new PollEntity();
	poll.question = faker.lorem.sentence()
	return poll;
});
