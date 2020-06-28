type TViewState = {
  projectId?: string;
  taskId?: string;
  timerIsOpen: boolean;
};

type TAppData = {
  projects: TProjects;
};

type TModalState = {
  open: boolean;
  type: string;
  data: object;
};

type TState = {
  appData: TAppData;
  view: TViewState;
  modal: TModalState;
};
