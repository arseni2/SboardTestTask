import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion.tsx';
import { IPoll } from '@/types.ts';
import { deletePoll, getPolls } from '@/api';
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from '@/components/ui/context-menu.tsx';
import PollForm from '@/components/form/PollForm.tsx';
import AccordionItemVote from '@/components/ui/AccordionItemVote.tsx';

function App() {
    const [polls, setPolls] = useState<IPoll[]>([]);
    const [page, setPage] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);
    const observer = useRef<IntersectionObserver | null>(null);
    const [isEnd, setIsEnd] = useState(false);
    const lastPollRef = useRef<HTMLDivElement | null>(null);

    const loadPolls = useCallback(async () => {
        setLoading(true);
        const data = await getPolls(page, 10);
        setPolls((prev) => [...prev, ...data.data]);
        console.log('data.total', data.total);
        console.log('polls.length', polls.length);
        if (data.total === polls.length - 1 || page > data.totalPages) {
            setIsEnd(true);
        }
        setLoading(false);
    }, [page, polls.length]);

    useEffect(() => {
        loadPolls();
    }, [page]);

    useEffect(() => {
        const currentElement = lastPollRef.current;

        const loadMore = (entries: IntersectionObserverEntry[]) => {
            if (entries[0].isIntersecting && !loading && !isEnd) {
                setPage((prev) => prev + 1);
            }
        };

        if (observer.current) {
            observer.current.disconnect();
        }

        observer.current = new IntersectionObserver(loadMore, {
            root: null,
            rootMargin: '180px',
            threshold: 1.0,
        });

        if (currentElement) {
            observer.current.observe(currentElement);
        }

        return () => {
            if (observer.current && currentElement) {
                observer.current.unobserve(currentElement);
            }
        };
    }, [loading, lastPollRef]);

    const handleClickDelete = (pollId: number) => {
        deletePoll(pollId).then(status => {
            if (status === 200) {
                setPolls((prevValue) => prevValue.filter((poll) => poll.id !== pollId));
            }
        });
    };

    const handlePollCreated = (newPoll: IPoll) => {
        setPolls((prev) => [...prev, newPoll]);
    };
    return (
        <div className={'max-w-[1000px] mx-auto'}>
            <PollForm onPollCreated={handlePollCreated} />

            <Accordion type="multiple">
                {polls.map((poll, i) => (
                    <ContextMenu key={i}>
                        <ContextMenuTrigger>
                            <div ref={isEnd ? null : lastPollRef}>
                                <AccordionItem value={`item-${i}`}>
                                    <AccordionTrigger>{poll.question}</AccordionTrigger>
                                    <AccordionContent className={'flex flex-col gap-2'}>
                                        {poll.responses.map((response) => {
                                            return <AccordionItemVote setPolls={setPolls} key={response.id} id={response.id} votesCount={response.votes?.length} text={response.text} />
                                        })}
                                    </AccordionContent>
                                </AccordionItem>
                            </div>
                        </ContextMenuTrigger>

                        <ContextMenuContent>
                            <ContextMenuItem onClick={() => handleClickDelete(poll.id)}>Delete</ContextMenuItem>
                        </ContextMenuContent>
                    </ContextMenu>
                ))}
            </Accordion>
            {loading && <div>Loading...</div>} {/* Индикатор загрузки */}
        </div>
    );
}

export default App;
