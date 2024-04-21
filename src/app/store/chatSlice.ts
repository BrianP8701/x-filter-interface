import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Chat } from "@/types/chat";

const initialState: Chat = {
    messages: [],
};

const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        setChat: (state, action: PayloadAction<Chat>) => {
            return action.payload;
        },
        clearChat: () => initialState,
        addChatMessage: (state, action: PayloadAction<{ role: string; content: string }>) => {
            state.messages.push(action.payload);
        },
    },
});

export const { setChat, clearChat, addChatMessage } = chatSlice.actions;
export default chatSlice.reducer;
