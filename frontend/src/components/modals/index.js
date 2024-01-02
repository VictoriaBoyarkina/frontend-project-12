import AddChannel from './AddChannel.js';
import RemoveChannel from './RemoveChannel.js';
import RenameChannel from './RenameChannel.js';

const modals = {
  adding: AddChannel,
  removing: RemoveChannel,
  renaming: RenameChannel,
};

const renderModal = (modal) => {
  const { active, name } = modal;
  if (!active) {
    return null;
  }
  const Component = modals[name];
  return <Component />;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default renderModal;
