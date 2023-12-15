import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { actions as modalActions } from '../../store/modalSlice.js';
import { EmitsContext } from '../../contexts/index.js';

const RemoveChannel = () => {
  const { t } = useTranslation();

  const { socket } = useContext(EmitsContext);

  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(modalActions.closeModal());
  };

  const [isSubmitting, setSubmitting] = useState(false);

  const { modal } = useSelector((state) => state.modal);
  const { channelId } = modal;

  const removeChannel = () => {
    setSubmitting(true);
    socket.emit('removeChannel', { id: channelId }, (response) => {
      console.log(response.status);
      setSubmitting(false);
      dispatch(modalActions.closeModal());
      toast.success(t('toast.deleteChannel'), {
        autoClose: 5000,
      });
    });
  };

  return (
    <>
      <div className="fade modal-backdrop show"></div>
      <div role="dialog" aria-modal="true" className="fade modal show" tabIndex="-1" style={{ display: 'block' }}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <div className="modal-title h4">
                {t('deleteChannel')}
              </div>
              <button
                type="button" onClick={closeModal} aria-label="Close" data-bs-dismiss="modal"
                className="btn btn-close"></button>
            </div>
            <div className="modal-body">
              <p className="lead">
                {t('areYouSure')}
              </p>
              <div className="d-flex justify-content-end">
                <button type="button" className="me-2 btn btn-secondary" onClick={closeModal}>
                  {t('buttons.cancel')}
                </button>
                <button
                  type="button" className="btn btn-danger"
                  disabled={isSubmitting} onClick={removeChannel}>
                  {t('buttons.delete')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RemoveChannel;
