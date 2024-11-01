"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_seeding_1 = require("typeorm-seeding");
const ru_1 = require("@faker-js/faker/locale/ru");
const response_entity_1 = require("../../responses/entities/response.entity");
(0, typeorm_seeding_1.define)(response_entity_1.ResponseEntity, () => {
    const response = new response_entity_1.ResponseEntity();
    response.text = ru_1.faker.lorem.sentence();
    return response;
});
//# sourceMappingURL=response.factory.js.map