export const VIEW_PROJECTS = () => ({
  type: 'VIEW_PROJECTS',
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
