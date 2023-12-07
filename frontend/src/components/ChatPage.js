/* eslint-disable react-hooks/exhaustive-deps */
//import axios from 'axios';
//import routes from '../routes.js';
import { useContext, useEffect, useRef, useState } from 'react';
import { selectors as channelsSelectors} from '../store/channelsSlice.js';
import { selectors as messagesSelectors} from '../store/messagesSlice.js';
import { useTranslation } from 'react-i18next';
import { EmitsContext } from '../contexts/index.js';
import { useDispatch, useSelector } from 'react-redux';
import { actions as currentChannelActions } from '../store/currentChannelSlice.js';
import { actions as modalActions } from '../store/modalSlice.js';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';

const ChatPage = () => {
    const { t } = useTranslation();

    const inputEl = useRef();
    useEffect(() => {
      inputEl.current.focus();
    }, []);

    const dispatch = useDispatch();

    const channels = useSelector(channelsSelectors.selectAll);
    const messages = useSelector(messagesSelectors.selectAll);
    const { currentChannel } = useSelector((state) => state.currentChannel);
    const currentChannelMessages = messages.filter((message) => message.channelId === currentChannel.id);

    const changeCurrentChannel = (id) => {
        const newChannel = channels.find((channel) => channel.id === id);
        dispatch(currentChannelActions.setCurrentChannel(newChannel));
    };

    const handleClickModal = (data) => {
        dispatch(modalActions.openModal(data));
    }
    
    const renderChannel = (channel) => {
        const variant = (channel.id === currentChannel.id) ? 'secondary' : '';

        if (channel.removable) {
            return (
                <li className="nav-item w-100" key={channel.id}>
                    <Dropdown className='d-flex' as={ButtonGroup}>
                        <Button className='w-100 rounded-0 text-start text-truncate'
                        onClick={() => changeCurrentChannel(channel.id)} variant={variant}>
                            <span className="me-1">#</span>
                            {channel.name}
                        </Button>
                        <Dropdown.Toggle split variant={variant} className="flex-grow-0 rounded-1" id="dropdown-split-basic"/>
                        <Dropdown.Menu>
                            <Dropdown.Item href="#" onClick={() => handleClickModal({name: 'removing', channelId: channel.id})}>{t('buttons.delete')}</Dropdown.Item>
                            <Dropdown.Item href="#" onClick={() => handleClickModal({name: 'renaming', channelId: channel.id})}>{t('buttons.rename')}</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </li>
            )
        }
        return (
            <li className="nav-item w-100" key={channel.id}>
                <Button className='w-100 rounded-0 text-start'
                onClick={() => changeCurrentChannel(channel.id)} variant={variant}>
                <span className="me-1">#</span>
                    {channel.name}
                </Button>
            </li>
        )
    };

    const renderMessage = (message) => {
        if (message.channelId === currentChannel.id) {
            return (
                <div className="text-break mb-2" key={message.id}>
                    <b>{message.user}</b>: {message.text}
                </div>
            )
        }
    };

    const { socket } = useContext(EmitsContext);

    const [messageValue, setMessageValue] = useState('');

    const handleChange = (e) => {
        setMessageValue(e.target.value)
    };

    const userName = JSON.parse(localStorage.getItem('userId')).username;

    const handleSubmit = (e) => {
        const message = { text: messageValue, user: userName, channelId: currentChannel.id }
        e.preventDefault();
        socket.emit("newMessage", message, (response) => {
            console.log(response.status); // ok
          });
        setMessageValue('');
    }

    return (
        <div className="container h-100 my-4 overflow-hidden rounded shadow">
            <div className="row h-100 bg-white flex-md-row">
                <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
                    <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
                        <b>{t('channels')}</b>
                        <button type="button" className="p-0 text-primary btn btn-group-vertical"
                        onClick={() => handleClickModal({name: 'adding'})}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20"
                            fill="currentColor">
                                <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2
                                0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z">
                                </path>
                                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z">
                                </path>
                            </svg>
                            <span className="visually-hidden">+</span>
                        </button>
                    </div>
                    <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
                        {channels.map((channel) => renderChannel(channel))}
                    </ul>
                </div>
                <div className="col p-0 h-100">
                    <div className="d-flex flex-column h-100">
                        <div className="bg-light mb-4 p-3 shadow-sm small">
                            <p className='m-0'>
                                <b># {currentChannel.name}</b>
                            </p>
                            <span className="text-muted">{t('messages.key', { count: currentChannelMessages.length})}</span>
                        </div>
                        <div id="messages-box" className="chat-messages overflow-auto px-5 ">
                            {messages.map((message) => renderMessage(message))}
                        </div>
                        <div className="mt-auto px-5 py-3">
                            <form noValidate="" className="py-1 border rounded-2" onSubmit={handleSubmit}>
                                <div className="input-group has-validation">
                                    <input
                                    ref={inputEl}
                                    onChange={handleChange}
                                    name="body"
                                    aria-label="Новое сообщение"
                                    placeholder="Введите сообщение..."
                                    className="border-0 p-0 ps-2 form-control"
                                    value={messageValue}/>
                                    <button type="submit" disabled="" className="btn btn-group-vertical">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
                                            <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z">
                                            </path>
                                        </svg>
                                        <span className="visually-hidden">{t('send')}
                                        </span>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default ChatPage;