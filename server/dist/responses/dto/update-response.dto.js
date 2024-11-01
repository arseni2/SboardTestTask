"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateResponseDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_response_dto_1 = require("./create-response.dto");
class UpdateResponseDto extends (0, mapped_types_1.PartialType)(create_response_dto_1.CreateResponseDto) {
}
exports.UpdateResponseDto = UpdateResponseDto;
//# sourceMappingURL=update-response.dto.js.map