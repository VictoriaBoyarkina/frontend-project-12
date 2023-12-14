import { configureStore } from "@reduxjs/toolkit";
import channelsReducer from './channelsSlice';
import messagesReducer from './messagesSlice';
import currentChannelIdReducer from './currentChannelIdSlice';
import modalReducer from './modalSlice';

export default configureStore({
    reducer: {
        channels: channelsReducer,
        currentChannelId: currentChannelIdReducer,
        messages: messagesReducer,
        modal: modalReducer,
    }
});