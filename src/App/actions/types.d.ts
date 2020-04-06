type TAction = {
  type: string;
  payload: {
    project?: TProject;
    task?: TTask;
    session?: TSession;
    projects?: TProjects;
    projectId?: string;
    taskId?: string;
    sessionId?: string;
  };
};
