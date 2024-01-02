import i18next from 'i18next';
import { io } from 'socket.io-client';
import { initReactI18next } from 'react-i18next';
import { useDispatch } from 'react-redux';
import App from './App';
import { actions as channelsActions } from '../store/channelsSlice.js';
import { actions as messagesActions } from '../store/messagesSlice.js';
import resources from '../locales/index.js';

const RunApp = () => {
  const i18n = i18next.createInstance();
  i18n
    .use(initReactI18next)
    .init({
      resources,
      debug: true,
      lng: 'ru',
      fallbackLng: 'ru',
      interpolation: {
        escapeValue: false,
      },
    });

  const dispatch = useDispatch();

  const socket = io();

  socket.on('newMessage', (message) => {
    dispatch(messagesActions.addMessage(message));
  });

  socket.on('newChannel', (channel) => {
    dispatch(channelsActions.addChannel(channel));
  });

  socket.on('removeChannel', (channel) => {
    dispatch(channelsActions.removeChannel(channel.id));
  });

  socket.on('renameChannel', (channel) => {
    dispatch(channelsActions.updateChannel({
      id: channel.id,
      changes: {
        name: channel.name,
      },
    }));
  });

  return (
    <App
      i18n={i18n}
      socket={socket}
    />
  );
};

export default RunApp;
