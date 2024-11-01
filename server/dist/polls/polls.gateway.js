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
exports.PollsGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const polls_service_1 = require("./polls.service");
const create_vote_dto_1 = require("../votes/dto/create-vote.dto");
let PollsGateway = class PollsGateway {
    constructor(pollsService) {
        this.pollsService = pollsService;
    }
    afterInit(server) {
        console.log('WebSocket server initialized');
    }
    async handleCreatePoll(createVoteDto, client) {
        const newPoll = await this.pollsService.createVote(createVoteDto);
        this.server.emit('pollCreated', newPoll);
    }
};
exports.PollsGateway = PollsGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], PollsGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('createPoll'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_vote_dto_1.CreateVoteDto, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], PollsGateway.prototype, "handleCreatePoll", null);
exports.PollsGateway = PollsGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({ cors: true }),
    __metadata("design:paramtypes", [polls_service_1.PollsService])
], PollsGateway);
//# sourceMappingURL=polls.gateway.js.map