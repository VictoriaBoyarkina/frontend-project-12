import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const channelsAdapter = createEntityAdapter();

const initialState = channelsAdapter.getInitialState();
const currentid = { currentChannelId: 1 };

const channelsSlice = createSlice({
  name: 'channels',
  initialState: { ...initialState, ...currentid },
  reducers: {
    addChannel: channelsAdapter.addOne,
    addChannels: channelsAdapter.addMany,
    updateChannel: channelsAdapter.updateOne,
    removeChannel: (state, { payload }) => {
      channelsAdapter.removeOne(state, payload);
    },
    setCurrentChannelId(state, { payload }) {
      // eslint-disable-next-line no-param-reassign
      state.currentChannelId = payload;
    },
  },
});

export const { actions } = channelsSlice;

export const selectors = channelsAdapter.getSelectors((state) => state.channels);

export default channelsSlice.reducer;
