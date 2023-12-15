import AddChannel from './AddChannel.js';
import RemoveChannel from './RemoveChannel.js';
import RenameChannel from './RenameChannel.js';

const modals = {
  adding: AddChannel,
  removing: RemoveChannel,
  renaming: RenameChannel,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (modalName) => modals[modalName];
