// app/store/userSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Filter from "@/types/filter";

const initialState: Filter = {
    id: "",
    user_id: "",
    target: "",
    name: "",
    primary_prompt: "",
    report_guide: "",
    filter_prompt: "",
    filter_period: 0,
    usernames: [],
    return_cap: 0,
    only_search_specified_usernames: false,
    keyword_groups: [],
    messages: [],
};

const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        setFilter: (state, action: PayloadAction<Filter>) => {
            return action.payload;
        },
        clearFilter: () => initialState,
        resetFilterToDefault: (state) => {
            Object.assign(state, initialState);
        },
    },
});

export const { setFilter, clearFilter, resetFilterToDefault } = filterSlice.actions;
export default filterSlice.reducer;
