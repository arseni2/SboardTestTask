"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const faker_1 = require("@faker-js/faker");
const vote_entity_1 = require("../../votes/entities/vote.entity");
class CreateVote {
    async run(factory, dataSource) {
        const responses = await dataSource.query(`SELECT * FROM responses`);
        for (const response of responses) {
            const votesCount = faker_1.faker.number.int({ min: 2, max: 4 });
            for (let j = 0; j < votesCount; j++) {
                await factory(vote_entity_1.VoteEntity)().create({ responseId: response.id });
            }
        }
    }
}
exports.default = CreateVote;
//# sourceMappingURL=vote-create.seed.js.map