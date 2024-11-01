import React, { useState } from 'react';
import { createPoll, IResponseCreate } from '@/api';
import { Button } from '@/components/ui/button.tsx';

interface PollFormProps {
    onPollCreated: (poll: any) => void; // Убедитесь, что тип 'any' соответствует информации о полле
}

const PollForm: React.FC<PollFormProps> = ({ onPollCreated }) => {
    const [question, setQuestion] = useState<string>('');
    const [answers, setAnswers] = useState<IResponseCreate[]>([{ text: '' }]);

    const addAnswerField = () => {
        setAnswers((prev) => [...prev, { text: '' }]);
    };

    const handleAnswerChange = (index: number, value: string) => {
        const newAnswers = [...answers];
        newAnswers[index].text = value;
        setAnswers(newAnswers);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const response = await createPoll({ question, responses: answers });
        if (response) {
            onPollCreated(response);
            setQuestion('');
            setAnswers([{ text: '' }]);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4">
            <input
                type="text"
                placeholder="Введите вопрос"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                required
                className="border p-2 w-full mb-2"
            />
            {answers.map((answer, index) => (
                <input
                    key={index}
                    type="text"
                    placeholder={`Ответ ${index + 1}`}
                    value={answer.text}
                    onChange={(e) => handleAnswerChange(index, e.target.value)}
                    className="border p-2 w-full mb-2"
                    required
                />
            ))}
            <Button type="button" onClick={addAnswerField} className="mr-2">Добавить ответ</Button>
            <Button type="submit">Создать опрос</Button>
        </form>
    );
};

export default PollForm;
