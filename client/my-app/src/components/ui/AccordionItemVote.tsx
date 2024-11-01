import React, { useCallback, useEffect } from 'react';
import voteApi from '@/api/voteSocket.ts';
import { IPoll } from '@/types.ts';

interface IProps {
    text: string
    votesCount: number
    id: number
    setPolls: React.Dispatch<React.SetStateAction<IPoll[]>>
}

const AccordionItemVote = ({votesCount, id, text, setPolls}: IProps) => {
    const handleClick = () => {
        voteApi.createVote({responseId: id})
    }

    const handleNewPoll = useCallback((newPoll: IPoll) => {
        setPolls((polls: IPoll[]) =>
            polls.map(p => p.id === newPoll.id ? newPoll : p)
        );
    }, [setPolls]);

    useEffect(() => {
        voteApi.subscribeToVoteCreated(handleNewPoll)

        return () => {
            voteApi.unsubscribeFromVoteCreated(handleNewPoll)
        }
    }, [handleNewPoll]);
    return (
        <div onClick={handleClick} className={"flex justify-between p-3 hover:bg-gray-100 rounded-md cursor-pointer transition-all"}>
            <div>{text}</div>
            <div>{votesCount}</div>
        </div>
    );
};

export default AccordionItemVote;