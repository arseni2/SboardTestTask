"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_seeding_1 = require("typeorm-seeding");
const poll_entity_1 = require("../../polls/entities/poll.entity");
const ru_1 = require("@faker-js/faker/locale/ru");
(0, typeorm_seeding_1.define)(poll_entity_1.PollEntity, () => {
    const poll = new poll_entity_1.PollEntity();
    poll.question = ru_1.faker.lorem.sentence();
    return poll;
});
//# sourceMappingURL=poll.factory.js.map