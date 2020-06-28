type TPayload = {
  project?: TProject;
  task?: TTask;
  session?: TSession;
  projects?: TProjects;
  projectId?: string;
  taskId?: string;
  sessionId?: string;
  type?: string;
  data?: object;
};

type TAction = {
  type: string;
  payload?: TPayload;
};
