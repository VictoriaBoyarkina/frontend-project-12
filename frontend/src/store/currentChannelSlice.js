import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";

const currentChannelAdapter = createEntityAdapter();

const currentChannelSlice = createSlice({
    name: 'currentChannel',
    initialState: {},
    reducers: {
        setCurrentChannel(state, { payload }) {
            state.currentChannel = payload;
        },
    }
});

export const { setCurrentChannel } = currentChannelSlice.actions;

export const { actions } = currentChannelSlice;

export const selectors = currentChannelAdapter.getSelectors((state) => state.currentChannelReducer.currentChannel);

export default currentChannelSlice.reducer;