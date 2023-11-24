/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import routes from '../routes.js';
import { useEffect} from 'react';

const ChatPage = () => {
    const getAuthHeader = () => {
        const userId = JSON.parse(localStorage.getItem('userId'));
      
        if (userId && userId.token) {
          return { Authorization: `Bearer ${userId.token}` };
        }
      
        return {};
      };

     useEffect(() => {
    const getContent = async () => {
      const { data } = await axios.get(routes.usersPath(), { headers: getAuthHeader() });
      console.log(data);
    }
   getContent()
  }, []);

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
        <div className="row h-100 bg-white flex-md-row">
            <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
                <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
                    <b>Каналы</b>
                </div>
                <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">

                </ul>
            </div>
            <div className="col p-0 h-100">
                <div className="d-flex flex-column h-100">
                    <div className="bg-light mb-4 p-3 shadow-sm small">
                        <p classNameName='m-0'>
                            <b></b>
                        </p>
                        <span className="text-muted">2 сообщения</span>
                    </div>
                    <div id="messages-box" className="chat-messages overflow-auto px-5 ">
                        <div className="text-break mb-2">
                            <b>admin</b>
                            : драти
                        </div>
                        <div className="text-break mb-2">
                            <  b>123</b>
                            : ghbdtn
                        </div>
                    </div>
                    <div className="mt-auto px-5 py-3">
                        <form noValidate="" className="py-1 border rounded-2">
                            <div className="input-group has-validation">
                                <input
                                name="body"
                                aria-label="Новое сообщение"
                                placeholder="Введите сообщение..."
                                className="border-0 p-0 ps-2 form-control"
                                value=""/>
                                <button type="submit" disabled="" className="btn btn-group-vertical">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
                                        <path fill-rule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z">
                                        </path>
                                    </svg>
                                    <span className="visually-hidden">Отправить
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