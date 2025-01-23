import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isShowModal: false,
  modalContent: { modalType: null, text: null },
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.isShowModal = true;
      state.modalContent = {modalType:action.payload.modalType, text:action.payload.text};
    },
    closeModal: (state) => {
      state.isShowModal = false;
      state.modalContent = null;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
