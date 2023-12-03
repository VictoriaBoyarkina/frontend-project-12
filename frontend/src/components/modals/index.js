import AddChannel from './AddChannel.js';

const modals = {
  adding: AddChannel,
  removing: '',
  renaming: '',
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (modalName) => modals[modalName];