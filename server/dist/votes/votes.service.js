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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VotesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const vote_entity_1 = require("./entities/vote.entity");
const typeorm_2 = require("typeorm");
const responses_service_1 = require("../responses/responses.service");
let VotesService = class VotesService {
    constructor(voteRepo, responseService) {
        this.voteRepo = voteRepo;
        this.responseService = responseService;
    }
    async create(createVoteDto) {
        const response = await this.responseService.findById(createVoteDto.responseId);
        if (!response)
            throw new common_1.BadRequestException("responseId not correct");
        return this.voteRepo.save(createVoteDto);
    }
    remove(id) {
        return this.voteRepo.delete(id);
    }
};
exports.VotesService = VotesService;
exports.VotesService = VotesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(vote_entity_1.VoteEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        responses_service_1.ResponsesService])
], VotesService);
//# sourceMappingURL=votes.service.js.map