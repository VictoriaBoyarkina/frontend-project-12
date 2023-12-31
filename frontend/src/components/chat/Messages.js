import LeoProfanity from 'leo-profanity';
import {
  useContext, useEffect, useRef, useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { selectors as messagesSelectors } from '../../store/messagesSlice.js';
import { EmitsContext } from '../../contexts/index.js';
import MessagesHeader from './MessagesHeader.js';

const Messages = () => {
  const inputEl = useRef();
  useEffect(() => {
    inputEl.current.focus();
  });

  const { t } = useTranslation();

  const container = useRef(null);

  const scrollDown = () => {
    container?.current?.lastElementChild?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  };

  useEffect(() => scrollDown());

  const userName = JSON.parse(localStorage.getItem('userId')).username;

  const messages = useSelector(messagesSelectors.selectAll);
  const { currentChannelId } = useSelector((state) => state.channels);

  const renderMessage = (message) => {
    const divClasses = (message.user === userName) ? 'text-break mb-2 bg-primary bg-opacity-10'
      : 'text-break mb-2';
    if (message.channelId === currentChannelId) {
      return (
        <div
          className={divClasses}
          key={message.id}
        >
          <b>
            {message.user}
          </b>
          :
          {' '}
          {message.text}
        </div>
      );
    }
    return null;
  };

  const { socket } = useContext(EmitsContext);

  const [messageValue, setMessageValue] = useState('');
  const [isSubmitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setMessageValue(e.target.value);
  };

  const handleSubmit = (e) => {
    setSubmitting(true);
    const message = {
      text: LeoProfanity.clean(messageValue),
      user: userName,
      channelId: currentChannelId,
    };
    e.preventDefault();
    socket.emit('newMessage', message, (response) => {
      console.log(response.status); // ok
      setSubmitting(false);
      scrollDown();
    });
    setMessageValue('');
  };

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <MessagesHeader />
        <div
          ref={container}
          id="messages-box"
          className="chat-messages overflow-auto px-5 "
        >
          {messages.map((message) => renderMessage(message))}
        </div>
        <div className="mt-auto px-5 py-3">
          <form
            noValidate=""
            className="py-1 border rounded-2"
            onSubmit={handleSubmit}
          >
            <div className="input-group has-validation">
              <input
                disabled={isSubmitting}
                ref={inputEl}
                onChange={handleChange}
                name="body"
                aria-label="Новое сообщение"
                placeholder={t('chat.messages.placeholder')}
                className="border-0 p-0 ps-2 form-control"
                value={messageValue}
              />
              <button
                type="submit"
                disabled={messageValue === ''}
                className="btn btn-group-vertical border border-0"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  width="20"
                  height="20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1
                                    1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2
                                    0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0
                                    .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"
                  />
                </svg>
                <span className="visually-hidden">
                  {t('buttons.send')}
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Messages;
