type TViewState = {
  projectId?: string;
  taskId?: string;
};

type TState = {
  appData: {
    projects?: TProjects;
  };
  view: TViewState;
};
