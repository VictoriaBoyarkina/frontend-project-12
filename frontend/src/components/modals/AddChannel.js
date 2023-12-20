import { useContext, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { selectors as channelsSelectors } from '../../store/channelsSlice.js';
import { actions as modalActions } from '../../store/modalSlice.js';
import { actions as currentChannelIdActions } from '../../store/currentChannelIdSlice.js';
import { EmitsContext } from '../../contexts/index.js';
import { getModalSchema } from '../../schemas/index.js';

const Addchannel = () => {
  const { t } = useTranslation();

  const inputEl = useRef();
  useEffect(() => {
    inputEl.current.focus();
  }, []);

  const { socket } = useContext(EmitsContext);

  const dispatch = useDispatch();

  const channels = useSelector(channelsSelectors.selectAll);
  const channelsNames = channels.map((channel) => channel.name);

  const closeModal = () => {
    dispatch(modalActions.closeModal());
  };

  const {
    values, errors, isSubmitting, handleBlur, handleChange, handleSubmit, setSubmitting,
  } = useFormik({
    initialValues: { name: '' },
    validationSchema: getModalSchema(channelsNames),
    onSubmit: () => {
      setSubmitting(true);
      const newChannel = { name: values.name, removable: true };
      socket.emit('newChannel', newChannel, (response) => {
        const { status, data } = response;
        console.log(status);
        toast.success(t('toast.addChannel'));
        dispatch(currentChannelIdActions.setCurrentChannelId(data.id));
        setSubmitting(false);
        dispatch(modalActions.closeModal());
      });
    },
  });

  const inputClasses = (!errors.name) ? 'mb-2 form-control' : 'mb-2 form-control is-invalid';

  return (
    <>
      <div className="fade modal-backdrop show" />
      <div
        role="dialog"
        aria-modal="true"
        className="fade modal show"
        tabIndex="-1"
        style={{ display: 'block' }}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <div className="modal-title h4">
                {t('addChannel')}
              </div>
              <button
                type="button"
                aria-label="Close"
                data-bs-dismiss="modal"
                onClick={closeModal}
                className="btn btn-close"
              />
            </div>
            <div className="modal-body">
              <form
                className=""
                onSubmit={handleSubmit}
              >
                <div>
                  <input
                    name="name"
                    id="name"
                    ref={inputEl}
                    className={inputClasses}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                  />
                  <label
                    className="visually-hidden"
                    htmlFor="name"
                  >
                    {t('channelName')}
                  </label>
                  <div
                    className="invalid-feedback"
                    style={{ display: 'block' }}
                  >
                    {t(errors.name)}
                  </div>
                  <div className="d-flex justify-content-end">
                    <button
                      type="button"
                      className="me-2 btn btn-secondary"
                      onClick={closeModal}
                    >
                      {t('buttons.cancel')}
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn btn-primary"
                    >
                      {t('buttons.send')}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Addchannel;
