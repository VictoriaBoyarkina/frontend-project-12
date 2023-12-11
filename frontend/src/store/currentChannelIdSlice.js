import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";

const currentChannelIdAdapter = createEntityAdapter();

const currentChannelIdSlice = createSlice({
    name: 'currentChannelId',
    initialState: {
        currentChannelId: 1,
    },
    reducers: {
        setCurrentChannelId(state, { payload }) {
            state.currentChannelId = payload;
        },
    }
});

export const { setCurrentChannelId } = currentChannelIdSlice.actions;

export const { actions } = currentChannelIdSlice;

export const selectors = currentChannelIdAdapter.getSelectors((state) => state.currentChannelIdReducer.currentChannelId);

export default currentChannelIdSlice.reducer;