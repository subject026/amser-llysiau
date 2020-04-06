type TViewState = {
  projectId?: string;
  taskId?: string;
};

type TState = {
  appData: TAppData;
  view: TViewState;
};

type TAppData = {
  projects: TProjects;
};
