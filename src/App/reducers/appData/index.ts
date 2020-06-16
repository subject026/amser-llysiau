import initialState from '../initialState';

export const projects = (state: TAppData = initialState.appData, action: TAction): TAppData => {
  const newAppData = { ...state };
  switch (action.type) {
    case 'HYDRATE_PROJECTS':
      newAppData.projects = {
        ...action.payload.projects,
      };
      return newAppData;

    case 'PROJECT_STAR_TOGGLE':
      console.log(action);
      newAppData.projects[action.payload.projectId].isStar = !newAppData.projects[action.payload.projectId].isStar;
      return newAppData;
    case 'CREATE_PROJECT':
      newAppData.projects[action.payload.project.id] = action.payload.project;
      return newAppData;
    case 'UPDATE_PROJECT':
      newAppData.projects[action.payload.project.id] = action.payload.project;
      return newAppData;
    case 'DELETE_PROJECT':
      delete newAppData.projects[action.payload.project.id];
      return newAppData;
    //
    //
    case 'CREATE_TASK':
      newAppData.projects[action.payload.task.projectId].tasks[action.payload.task.id] = action.payload.task;
      return newAppData;
    case 'UPDATE_TASK':
      newAppData.projects[action.payload.task.projectId].tasks[action.payload.task.id] = action.payload.task;
      return newAppData;
    case 'DELETE_TASK':
      delete newAppData.projects[action.payload.task.projectId].tasks[action.payload.task.id];
      return newAppData;
    default:
      return newAppData;
    //
    //
    case 'CREATE_SESSION':
      newAppData.projects[action.payload.session.projectId].tasks[action.payload.session.taskId].sessions[
        action.payload.session.id
      ] = action.payload.session;
      return newAppData;
    case 'UPDATE_SESSION':
      newAppData.projects[action.payload.session.projectId].tasks[action.payload.session.taskId].sessions[
        action.payload.session.id
      ] = action.payload.session;
      return newAppData;
    case 'DELETE_SESSION':
      delete newAppData.projects[action.payload.session.projectId].tasks[action.payload.session.taskId].sessions[
        action.payload.session.id
      ];
      return newAppData;
  }
};

export default (state: TAppData, action: TAction): TAppData => {
  const newState = projects(state, action);
  if (action.payload) localStorage.setItem('appData', JSON.stringify(newState));
  return newState;
};
