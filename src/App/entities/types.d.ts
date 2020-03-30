type TProject = {
  id: string;
  title: string;
  created: number;
  lastUpdated: number;
  tasks: TTasks;
  githubRepo: string | boolean;
  isStar: boolean;
};

type TTask = {
  id: string;
  title: string;
  projectId: string;
  created: number;
  lastUpdated: number;
  sessions: TSessions;
  githubIssue: string | boolean;
};

type TSession = {
  id: string;
  focus: string;
  projectId: string;
  taskId: string;
  startTime: number;
  finishTime: number;
};

type TProjects = {
  [key: string]: TProject;
};

type TTasks = {
  [key: string]: TTask;
};

type TSessions = {
  [key: string]: TSession;
};

type TProjectUpdates = {
  title: string;
};

type TTaskUpdates = {
  title: string;
};
