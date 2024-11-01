import io from 'socket.io-client';
import { IPoll } from '@/types.ts';

const socket = io('http://localhost:3000'); // URL вашего WebSocket-сервера

interface ICreateVote {
    responseId: number
}

const voteApi = {
    subscribeToVoteCreated: (callback: (poll: IPoll) => void) => {
        socket.on('pollCreated', callback);
    },

    unsubscribeFromVoteCreated: (callback: (poll: IPoll) => void) => {
        socket.off('pollCreated', callback);
    },

    createVote: (pollData: ICreateVote) => {
        socket.emit('createPoll', pollData);
    }
};

export default voteApi;