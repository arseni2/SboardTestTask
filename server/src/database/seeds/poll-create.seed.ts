import {Factory, Seeder} from "typeorm-seeding";
import {PollEntity} from "../../polls/entities/poll.entity";

export default class CreatePolls implements Seeder {
	public async run(factory: Factory): Promise<any> {
		await factory(PollEntity)().createMany(100);
	}
}