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
exports.PollsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const poll_entity_1 = require("./entities/poll.entity");
const typeorm_2 = require("typeorm");
const responses_service_1 = require("../responses/responses.service");
const votes_service_1 = require("../votes/votes.service");
let PollsService = class PollsService {
    constructor(pollRepo, responseService, voteService) {
        this.pollRepo = pollRepo;
        this.responseService = responseService;
        this.voteService = voteService;
    }
    async create(createPollDto) {
        let responses = null;
        if (createPollDto.responses) {
            try {
                responses = await this.responseService.createMany(createPollDto.responses);
            }
            catch (e) {
                throw new common_1.BadRequestException('Не удалось создать responses');
            }
        }
        return this.pollRepo.save({ ...createPollDto, responses });
    }
    async findAll(page, limit) {
        const [result, total] = await this.pollRepo.findAndCount({
            skip: (page - 1) * limit,
            take: limit,
            relations: {
                responses: {
                    votes: true,
                },
            },
        });
        return {
            data: result,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
    }
    async createVote(createVoteDto) {
        const vote = await this.voteService.create(createVoteDto);
        const response = await this.responseService.findById(vote.responseId);
        return this.pollRepo.findOne({
            where: { id: response.pollId },
            transaction: false,
            relations: { responses: { votes: true } },
        });
    }
    remove(id) {
        return this.pollRepo.delete(id);
    }
};
exports.PollsService = PollsService;
exports.PollsService = PollsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(poll_entity_1.PollEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        responses_service_1.ResponsesService,
        votes_service_1.VotesService])
], PollsService);
//# sourceMappingURL=polls.service.js.map