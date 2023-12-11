/* eslint-disable react-hooks/exhaustive-deps */
//import axios from 'axios';
//import routes from '../routes.js';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch} from 'react-redux';
import { actions as currentChannelIdActions } from '../../store/currentChannelIdSlice.js';
import routes from '../../routes.js';
import useAuth from '../../hooks/index.js';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { actions as channelsActions } from '../../store/channelsSlice.js';
import { actions as messagesActions } from '../../store/messagesSlice.js';
import { toast } from 'react-toastify';
import Channels from './Channels.js';
import Messages from './Messages.js';

const ChatPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const auth = useAuth();

    let from = location.state?.from?.pathname;

    const getAuthHeader = () => {
        const userId = JSON.parse(localStorage.getItem('userId'));
        if (userId && userId.token) {
          return { Authorization: `Bearer ${userId.token}` };
          
        }
        return {};
    };
    
    useEffect(() => {
        const fetchData = async () => {
            await axios.get(routes.usersPath(), { headers: getAuthHeader() })
            .then(({data}) => {
                const { channels, currentChannelId, messages } = data;
        
                dispatch(channelsActions.addChannels(channels));
                dispatch(messagesActions.addMessages(messages));
                dispatch(currentChannelIdActions.setCurrentChannelId(currentChannelId));
            })
            .catch((err) => {
                console.log(err.message)
                if (err.isAxiosError && err.response.status === 401) {
                    auth.logOut()
                    navigate(from)
            }              
            if (err.message === 'Network Error') {
                toast.error(t('toast.networkError'), {
                    autoClose: 5000
                })
              }
        })
        }
        fetchData();
    }, [dispatch])

    return (
        <div className="container h-100 my-4 overflow-hidden rounded shadow">
            <div className="row h-100 bg-white flex-md-row">
                <Channels/>
                <Messages/>
            </div>
        </div>
    )
};

export default ChatPage;