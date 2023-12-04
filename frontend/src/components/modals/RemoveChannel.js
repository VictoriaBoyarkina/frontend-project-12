import { useContext } from 'react';
import { EmitsContext } from '../../contexts/index.js';
import { useDispatch, useSelector } from 'react-redux';
import { actions as modalActions } from '../../store/modalSlice.js';

const RemoveChannel = () => {

    const { socket } = useContext(EmitsContext);

    const dispatch = useDispatch();

    const closeModal = () => {
        dispatch(modalActions.closeModal());
    };

    const { modal } = useSelector((state) => state.modal);
    const { channelId } = modal;

    const removeChannel = () => {
        socket.emit("removeChannel", { id: channelId }, (response) => {
            console.log(response.status); // ok
            });

        dispatch(modalActions.closeModal());
    }

    return (
        <>
            <div className="fade modal-backdrop show"></div>
            <div role="dialog" aria-modal="true" className="fade modal show" tabIndex="-1" style={{display: "block"}}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <div className="modal-title h4">Удалить канал</div>
                            <button type="button" onClick={closeModal} aria-label="Close" data-bs-dismiss="modal" className="btn btn-close"></button>
                        </div>
                        <div className="modal-body">
                            <p className="lead">Уверены?</p>
                            <div className="d-flex justify-content-end">
                                <button type="button" className="me-2 btn btn-secondary" onClick={closeModal}>Отменить</button>
                                <button type="button" className="btn btn-danger" onClick={removeChannel}>Удалить</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RemoveChannel;