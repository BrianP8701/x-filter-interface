"use client";
// app/home/index.tsx
import React from 'react';

import MainLayout from '@/components/layout/MainLayout';
import { Badge } from "@/components/ui/badge"
import ConversationMessage from "@/components/custom/conversationMessage";
import { Textarea } from "@/components/ui/textarea"
import { CornerDownLeft } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useSelector, useDispatch } from "react-redux"
import { RootState } from "@/app/store/store"
import { setChat } from "@/app/store/chatSlice"
import { sendChatMessageRoute } from '@/app/api/sendData';

const HomePage = () => {
    const messages = useSelector((state: RootState) => state.chat.messages);
    const [message, setMessage] = React.useState('');
    const user_id = useSelector((state: RootState) => state.user.id);
    const dispatch = useDispatch();
    const sendMessage = async () => {
        setMessage('');
        const user_chat = await sendChatMessageRoute(user_id, message);
        dispatch(setChat(user_chat));
    };
 
    return (
        <MainLayout>
            <div className="flex items-center justify-center h-screen">
                <div className="w-1/2 h-4/5 relative flex flex-col h-[calc(100vh - 100px)] bg-muted/50 p-4 rounded-xl overflow-hidden lg:col-span-2"
                    style={{ boxSizing: 'border-box' }} // Ensures padding is included in the height calculation
                >
                    <Badge variant="outline" className="absolute right-3 top-3">
                        Output
                    </Badge>
                    <div className="flex flex-col flex-1 min-h-0"> {/* Ensures flex container consumes available space and does not shrink below its minimum height */}
                        <div className="flex-1 overflow-y-auto space-y-4"> {/* Flex container for messages */}
                            {messages.map((message, index) => (
                                <div key={index} className="py-4"> {/* Add padding to create space between messages */}
                                    <ConversationMessage text={message.content} role={message.role} />
                                </div>
                            ))}
                        </div>
                        <div className="mt-auto" style={{ height: '140px' }}> {/* Fixed height for input area and push it to the bottom using mt-auto */}
                            <form
                                className="h-full relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring"
                            >
                                <Label htmlFor="message" className="sr-only">
                                    Message
                                </Label>
                                <Textarea
                                    id="message"
                                    placeholder="Type your message here..."
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0 w-full"
                                />
                                <div className="flex items-center p-3 pt-0">
                                    <Button type="submit" size="sm" className="ml-auto gap-1.5" onClick={sendMessage}>
                                        Send Message
                                        <CornerDownLeft className="size-3.5" />
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default HomePage;
