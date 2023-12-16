import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { selectors as messagesSelectors } from '../../store/messagesSlice.js';
import { selectors as channelsSelectors } from '../../store/channelsSlice.js';

const MessagesHeader = () => {
  const { t } = useTranslation();
  const channels = useSelector(channelsSelectors.selectAll);
  const messages = useSelector(messagesSelectors.selectAll);
  const { currentChannelId } = useSelector((state) => state.currentChannelId);
  const currentChannel = channels.find((channel) => channel.id === currentChannelId);
  const currentChannelMessages = messages
    .filter((message) => message.channelId === currentChannelId);

  return (
    <div className="bg-light mb-4 p-3 shadow-sm small">
      <p className="m-0">
        <b>
          #
          {' '}
          {currentChannel ? currentChannel.name : ''}
        </b>
      </p>
      <span className="text-muted">
        {t('messages.key', { count: currentChannelMessages.length })}
      </span>
    </div>
  );
};

export default MessagesHeader;
