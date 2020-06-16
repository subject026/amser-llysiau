import initialState from '../initialState';

export default (viewState: TViewState = initialState.view, action: TAction): TViewState => {
  let newView = { ...viewState };
  switch (action.type) {
    case 'VIEW_BACK':
      if (newView.taskId) {
        delete newView.taskId;
        return newView;
      }
      if (newView.projectId) {
        delete newView.projectId;
      }
      return newView;
    case 'VIEW_PROJECTS':
      newView = { timerIsOpen: false };
      return newView;
    case 'SELECT_PROJECT':
      newView.projectId = action.payload.projectId;
      return newView;
    case 'SELECT_TASK':
      newView.taskId = action.payload.taskId;
      return newView;
    case 'OPEN_MODAL':
      newView.timerIsOpen = true;
      return newView;
    case 'CLOSE_MODAL':
      newView.timerIsOpen = false;
      return newView;
    default:
      return viewState;
  }
};
