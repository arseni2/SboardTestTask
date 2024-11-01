import {DataSource, DataSourceOptions} from "typeorm";
import { config } from 'dotenv';
import { join } from 'path';
import {ResponseEntity} from "../responses/entities/response.entity";
import {VoteEntity} from "../votes/entities/vote.entity";
import {PollEntity} from "../polls/entities/poll.entity";

config({ path: join(process.cwd(), '.env') });
export const options: DataSourceOptions = {
	type: 'postgres',
	host: process.env.DB_HOST,
	username: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_DATABASE,
	port: +process.env.DB_PORT,
	entities: [
		ResponseEntity,
		VoteEntity,
		PollEntity
	],
	migrations: [join(process.cwd(), 'src', 'database', 'migrations', '*.ts')],
	migrationsTableName: 'migrations',
	synchronize: true,
	logging: true,

};

const dataSource = new DataSource(options);

export default dataSource;
