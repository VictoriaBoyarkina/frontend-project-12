import { useState, useContext, useEffect, useRef } from 'react';
import { EmitsContext } from '../../contexts/index.js';
import { useDispatch, useSelector } from 'react-redux';
import { selectors as channelsSelectors} from '../../store/channelsSlice.js';
import { actions as modalActions } from '../../store/modalSlice.js';
import { useFormik } from 'formik';
import schema from '../../schemas/index.js';

const RenameChannel = () => {
    const inputEl = useRef();
    useEffect(() => {
      inputEl.current.focus();
    }, []);

    const { socket } = useContext(EmitsContext);

    const dispatch = useDispatch();

    const channels = useSelector(channelsSelectors.selectAll);

    const { modal } = useSelector((state) => state.modal);
    const { channelId } = modal;

    const currentChannel = channels.find((channel) => channel.id === channelId);

    const [channelName, setChannelName] = useState(currentChannel.name);

    const [error, setError] = useState('');

    const handleChange = (e) => {
        setChannelName(e.target.value)
    };

    const closeModal = () => {
        dispatch(modalActions.closeModal());
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!channels.find((channel) => channel.name === channelName)) {
            const channel = { name: channelName, id: channelId};
        
            socket.emit("renameChannel", channel, (response) => {
                console.log(response.status); // ok
                });
            
            dispatch(modalActions.closeModal());
            setError('');
            setChannelName('');
        } else {
            setError('Должно быть уникальным');
        }
    }

    const inputClasses = (error === '') ? 'mb-2 form-control' : 'mb-2 form-control is-invalid'

    return (
        <><div className="fade modal-backdrop show"></div><div role="dialog" aria-modal="true" className="fade modal show" tabIndex="-1" style={{ display: 'block' }}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <div className="modal-title h4">Переименовать канал</div>
                        <button type="button" aria-label="Close" data-bs-dismiss="modal" onClick={closeModal} className="btn btn-close"></button>
                    </div>
                    <div className="modal-body">
                        <form className="" onSubmit={handleSubmit}>
                            <div>
                                <input ref={inputEl} name="name" id="name" className={inputClasses} value={channelName} onChange={handleChange}/>
                                <label className="visually-hidden" htmlFor="name">Имя канала</label>
                                <div className="invalid-feedback" style={{ display: 'block' }}>{error}</div>
                                <div className="d-flex justify-content-end">
                                    <button type="button" className="me-2 btn btn-secondary" onClick={closeModal}>Отменить</button>
                                    <button type="submit" className="btn btn-primary">Отправить</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div></>
    )
}

export default RenameChannel;