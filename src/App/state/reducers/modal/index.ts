import initialState from '../initialState';

type TModalState = {
  open: boolean;
  type: string;
  data: object;
};

export default (state: TModalState = initialState.modal, action: TAction): TModalState => {
  let newState = { ...state };
  switch (action.type) {
    // case 'VIEW_BACK':
    //   if (newView.taskId) {
    //     delete newView.taskId;
    //     return newView;
    //   }
    //   if (newView.projectId) {
    //     delete newView.projectId;
    //   }
    //   return newView;
    // case 'VIEW_PROJECTS':
    //   newView = { timerIsOpen: false };
    //   return newView;
    // case 'SELECT_PROJECT':
    //   newView.projectId = action.payload.projectId;
    //   return newView;
    // case 'SELECT_TASK':
    //   newView.taskId = action.payload.taskId;
    //   return newView;
    case 'OPEN_MODAL':
      newState.type = action.payload.type;
      newState.data = action.payload.data;
      return newState;
    case 'CLOSE_MODAL':
      newState.open = false;
      newState.data = null;
      newState.type = null;
      return newState;
    default:
      return state;
  }
};
