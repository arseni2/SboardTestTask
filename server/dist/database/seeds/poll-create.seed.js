"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const poll_entity_1 = require("../../polls/entities/poll.entity");
class CreatePolls {
    async run(factory) {
        await factory(poll_entity_1.PollEntity)().createMany(100);
    }
}
exports.default = CreatePolls;
//# sourceMappingURL=poll-create.seed.js.map