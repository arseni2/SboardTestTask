"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const response_entity_1 = require("../../responses/entities/response.entity");
class CreateResponses {
    async run(factory, dataSource) {
        const polls = await dataSource.query(`SELECT * FROM polls`);
        for (let i = 0; i < polls.length; i++) {
            await factory(response_entity_1.ResponseEntity)().create({ pollId: polls[i].id });
            await factory(response_entity_1.ResponseEntity)().create({ pollId: polls[i].id });
        }
    }
}
exports.default = CreateResponses;
//# sourceMappingURL=response-create.seed.js.map