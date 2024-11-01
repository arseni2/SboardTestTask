"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePollDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_poll_dto_1 = require("./create-poll.dto");
class UpdatePollDto extends (0, mapped_types_1.PartialType)(create_poll_dto_1.CreatePollDto) {
}
exports.UpdatePollDto = UpdatePollDto;
//# sourceMappingURL=update-poll.dto.js.map