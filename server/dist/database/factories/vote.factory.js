"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_seeding_1 = require("typeorm-seeding");
const vote_entity_1 = require("../../votes/entities/vote.entity");
(0, typeorm_seeding_1.define)(vote_entity_1.VoteEntity, () => {
    return new vote_entity_1.VoteEntity();
});
//# sourceMappingURL=vote.factory.js.map