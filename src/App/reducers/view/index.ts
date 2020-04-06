import initialState from '../initialState';

export default (viewState: TViewState = initialState.view, action: TAction): TViewState => {
  let newView = { ...viewState };
  switch (action.type) {
    case 'VIEW_PROJECTS':
      newView = {};
      return newView;
    case 'SELECT_PROJECT':
      newView.projectId = action.payload.projectId;
      return newView;
    case 'SELECT_TASK':
      newView.taskId = action.payload.taskId;
      return newView;
    default:
      return viewState;
  }
};
