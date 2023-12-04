import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";

const modalAdapter = createEntityAdapter();

const initialState = {
    modal: { name: '', active: false, channelId: null },
  };

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openModal(state, { payload } ) {
            state.modal.name = payload.name;
            state.modal.channelId = payload.channelId;
            state.modal.active = true;
        },
        closeModal(state) {
            state.modal.active = false;
        }
    }
});

export const { openModal, closeModal } = modalSlice.actions;

export const { actions } = modalSlice;

export const selectors = modalAdapter.getSelectors((state) => state.modal);

export default modalSlice.reducer;