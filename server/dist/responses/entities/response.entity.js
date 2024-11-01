"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseEntity = void 0;
const typeorm_1 = require("typeorm");
const vote_entity_1 = require("../../votes/entities/vote.entity");
const poll_entity_1 = require("../../polls/entities/poll.entity");
let ResponseEntity = class ResponseEntity {
};
exports.ResponseEntity = ResponseEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ResponseEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => poll_entity_1.PollEntity, (poll) => poll.id, { onDelete: 'CASCADE' }),
    __metadata("design:type", poll_entity_1.PollEntity)
], ResponseEntity.prototype, "poll", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], ResponseEntity.prototype, "pollId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ResponseEntity.prototype, "text", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], ResponseEntity.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => vote_entity_1.VoteEntity, (vote) => vote.response),
    __metadata("design:type", Array)
], ResponseEntity.prototype, "votes", void 0);
exports.ResponseEntity = ResponseEntity = __decorate([
    (0, typeorm_1.Entity)('responses')
], ResponseEntity);
//# sourceMappingURL=response.entity.js.map