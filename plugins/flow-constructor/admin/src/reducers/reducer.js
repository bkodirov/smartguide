export const initialState = {
  modal: {
    isAddModalOpen: false,
    isEditModalOpen: false,
    currentData: {},
  },
};

export default function reducer(state, action) {
  switch (action.type) {
    case "toggle_edit_modal":
      return {
        ...state,
        modal: {
          ...state.modal,
          isEditModalOpen: !state.modal.isEditModalOpen,
          currentData: action.payload,
        },
      };
    case "close_modal":
      return {
        ...state,
        modal: {
          ...state.modal,
          isAddModalOpen: false,
          isEditModalOpen: false,
          currentData: {},
        },
      };
    case "toggle_add_modal":
      return {
        ...state,
        modal: {
          ...state.modal,
          isAddModalOpen: !state.modal.isAddModalOpen,
        },
      };
    default:
      return;
  }
}
