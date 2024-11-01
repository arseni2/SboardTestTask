"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.options = void 0;
const typeorm_1 = require("typeorm");
const dotenv_1 = require("dotenv");
const path_1 = require("path");
const response_entity_1 = require("../responses/entities/response.entity");
const vote_entity_1 = require("../votes/entities/vote.entity");
const poll_entity_1 = require("../polls/entities/poll.entity");
(0, dotenv_1.config)({ path: (0, path_1.join)(process.cwd(), '.env') });
exports.options = {
    type: 'postgres',
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: +process.env.DB_PORT,
    entities: [
        response_entity_1.ResponseEntity,
        vote_entity_1.VoteEntity,
        poll_entity_1.PollEntity
    ],
    migrations: [(0, path_1.join)(process.cwd(), 'src', 'database', 'migrations', '*.ts')],
    migrationsTableName: 'migrations',
    synchronize: true,
    logging: true,
};
const dataSource = new typeorm_1.DataSource(exports.options);
exports.default = dataSource;
//# sourceMappingURL=migrations.config.js.map