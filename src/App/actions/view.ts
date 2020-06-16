export const VIEW_PROJECTS = () => ({
  type: 'VIEW_PROJECTS',
});

export const VIEW_BACK = () => ({
  type: 'VIEW_BACK',
});

export const SELECT_PROJECT = (id: string): TAction => ({
  type: 'SELECT_PROJECT',
  payload: {
    projectId: id,
  },
});

export const SELECT_TASK = (id: string): TAction => ({
  type: 'SELECT_TASK',
  payload: {
    taskId: id,
  },
});

export const OPEN_MODAL = (): TAction => ({
  type: 'OPEN_MODAL',
});

export const CLOSE_MODAL = (): TAction => ({
  type: 'CLOSE_MODAL',
});
