export const initialState = {
  modal: {
    isAddModalOpen: false,
    isEditModalOpen: false,
    currentData: {},
    isLinkingModalOpen: false,
    currentAnswer: {},
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
          isLinkingModalOpen: false,
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
    case "toggle_linking_modal":
      return {
        ...state,
        modal: {
          ...state.modal,
          isLinkingModalOpen: !state.modal.isLinkingModalOpen,
          currentAnswer: action.payload,
        },
      };
    default:
      return;
  }
}
