import { Factory, Seeder } from "typeorm-seeding";
import { DataSource } from "typeorm";
export default class CreateVote implements Seeder {
    run(factory: Factory, dataSource: DataSource): Promise<void>;
}
