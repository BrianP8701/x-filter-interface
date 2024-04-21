// Message.tsx
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface MessageProps {
    text: string;
    role: string;
}

const ConversationMessage: React.FC<MessageProps> = ({ text, role }) => {
    const processedText = text.replace(/\n/g, '\n\n');

    return (
        <div className="w-full flex justify-center">
            <div style={{ width: '600px' }} className="grid grid-cols-[25px_1fr] grid-rows-[auto_1fr] gap-1">
                <div className="col-start-1 row-start-1">
                    <Avatar>
                        <AvatarImage src={role === 'assistant' ? "/chatgpt_logo.png" : "/user_logo.png"} />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </div>
                <div className="col-start-2 row-start-1 flex items-center ml-1">
                    <span>{role}</span>
                </div>
                <div className="col-start-2 col-end-3 row-start-2 p-1">
                    <ReactMarkdown>{processedText}</ReactMarkdown>
                </div>
            </div>
        </div>
    );
};

export default ConversationMessage;
