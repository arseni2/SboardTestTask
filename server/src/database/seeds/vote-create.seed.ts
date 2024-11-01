import {Factory, Seeder} from "typeorm-seeding";
import {ResponseEntity} from "../../responses/entities/response.entity";
import {DataSource} from "typeorm";
import {faker} from "@faker-js/faker";
import {VoteEntity} from "../../votes/entities/vote.entity";

export default class CreateVote implements Seeder {
	public async run(factory: Factory, dataSource: DataSource): Promise<void> {
		const responses: ResponseEntity[] = await dataSource.query(`SELECT * FROM responses`);

		for (const response of responses) {
			const votesCount = faker.number.int({ min: 2, max: 4 });

			for (let j = 0; j < votesCount; j++) {
				await factory(VoteEntity)().create({ responseId: response.id });
			}
		}
	}
}