import { configureStore } from "@reduxjs/toolkit";
import channelsReducer from './channelsSlice';
import messagesReducer from './messagesSlice';
import currentChannelReducer from './currentChannelSlice';

export default configureStore({
    reducer: {
        channels: channelsReducer,
        currentChannel: currentChannelReducer,
        messages: messagesReducer,
    }
});