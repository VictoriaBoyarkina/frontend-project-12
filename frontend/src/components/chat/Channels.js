import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import { actions as modalActions } from '../../store/modalSlice.js';
import { actions as currentChannelIdActions } from '../../store/currentChannelIdSlice.js';
import { selectors as channelsSelectors } from '../../store/channelsSlice.js';

const Channels = () => {
    const dispatch = useDispatch();

    const { t } = useTranslation();

    const channels = useSelector(channelsSelectors.selectAll);
    const { currentChannelId } = useSelector((state) => state.currentChannelId);

    const changeCurrentChannel = (id) => {
        dispatch(currentChannelIdActions.setCurrentChannelId(id));
    };

    const handleClickModal = (data) => {
        dispatch(modalActions.openModal(data));
    };

    const renderChannel = (channel) => {
        const variant = (channel.id === currentChannelId) ? 'secondary' : '';

        const renderButton = () => (
            <Button className='w-100 rounded-0 text-start'
                onClick={() => changeCurrentChannel(channel.id)} variant={variant}>
                <span className="me-1">#</span>
                {channel.name}
            </Button>
        );

        return channel.removable ? (
            <li className="nav-item w-100" key={channel.id}>
                <Dropdown className='d-flex' as={ButtonGroup}>
                    {renderButton()}
                    <Dropdown.Toggle split variant={variant} className="flex-grow-0" id="dropdown-split-basic">
                        <span className="visually-hidden">{t('handleChannel')}</span>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item href="#"
                            onClick={() => handleClickModal({ name: 'removing', channelId: channel.id })}>
                            {t('buttons.delete')}
                        </Dropdown.Item>
                        <Dropdown.Item href="#"
                            onClick={() => handleClickModal({ name: 'renaming', channelId: channel.id })}>
                            {t('buttons.rename')}
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </li>
        ) : (
            <li className="nav-item w-100" key={channel.id}>
                {renderButton()}
            </li>

        );
    };

    return (
        <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
            <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
                <b>{t('channels')}</b>
                <button type="button" className="p-0 text-primary btn btn-group-vertical"
                    onClick={() => handleClickModal({ name: 'adding' })}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20"
                        fill="currentColor">
                        <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2
                    0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z">
                        </path>
                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1
                        0-1h3v-3A.5.5 0 0 1 8 4z">
                        </path>
                    </svg>
                    <span className="visually-hidden">+</span>
                </button>
            </div>
            <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
                {channels.map((channel) => renderChannel(channel))}
            </ul>
        </div>
    );
};

export default Channels;
