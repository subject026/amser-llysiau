type TViewState = {
  projectId?: string;
  taskId?: string;
  timerIsOpen: boolean;
};

type TAppData = {
  projects: TProjects;
};

type TState = {
  appData: TAppData;
  view: TViewState;
};
