export const HYDRATE_PROJECTS = (projects: TProjects) => {
  return {
    type: 'HYDRATE_PROJECTS',
    payload: { projects },
  };
};

export const CREATE_PROJECT = (project: TProject): TAction => ({
  type: 'CREATE_PROJECT',
  payload: { project },
});

export const UPDATE_PROJECT = (project: TProject): {} => ({
  type: 'UPDATE_PROJECT',
  payload: { project },
});

export const PROJECT_STAR_TOGGLE = (id: string): TAction => ({
  type: 'PROJECT_STAR_TOGGLE',
  payload: { projectId: id },
});

export const DELETE_PROJECT = (project: TProject): TAction => ({
  type: 'DELETE_PROJECT',
  payload: { project },
});

export const CREATE_TASK = (task: TTask): TAction => ({
  type: 'CREATE_TASK',
  payload: { task },
});

export const UPDATE_TASK = (task: TTask): TAction => ({
  type: 'UPDATE_TASK',
  payload: { task },
});

export const DELETE_TASK = (task: TTask): TAction => ({
  type: 'DELETE_TASK',
  payload: { task },
});

export const CREATE_SESSION = (session: TSession): TAction => ({
  type: 'CREATE_SESSION',
  payload: {
    session,
  },
});

export const UPDATE_SESSION = (session: TSession): TAction => ({
  type: 'UPDATE_SESSION',
  payload: {
    session,
  },
});

export const DELETE_SESSION = (session: TSession): TAction => ({
  type: 'DELETE_SESSION',
  payload: { session },
});
