import {Factory, Seeder} from "typeorm-seeding";
import {ResponseEntity} from "../../responses/entities/response.entity";
import {DataSource} from "typeorm";
import {PollEntity} from "../../polls/entities/poll.entity";

export default class CreateResponses implements Seeder {
	public async run(factory: Factory, dataSource: DataSource): Promise<any> {
		const polls: PollEntity[] = await dataSource.query(`SELECT * FROM polls`);
		for(let i= 0; i < polls.length; i++) { //по 2 ответа на опрос
			await factory(ResponseEntity)().create({pollId: polls[i].id})
			await factory(ResponseEntity)().create({pollId: polls[i].id})
		}

	}
}