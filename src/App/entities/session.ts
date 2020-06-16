import { v4 as uuid } from 'uuid';

export type TCreateSession = {
  focus: string;
  projectId: string;
  taskId: string;
  startTime: number;
  finishTime: number;
};

export const createSession = (props: TCreateSession): TSession => {
  const { focus, startTime, finishTime, projectId, taskId } = props;

  if (!focus) {
    throw new Error('Error! createNewSession() - no focus provided');
  }
  if (!startTime) {
    throw new Error('Error! createNewSession() - no start time provided');
  }
  if (!finishTime) {
    throw new Error('Error! createNewSession() - no finish time provided');
  }
  if (!projectId) {
    throw new Error('Error! createNewSession() - no projectId provided');
  }
  if (!taskId) {
    throw new Error('Error! createNewSession() - no taskId provided');
  }

  return {
    id: uuid(),
    focus,
    startTime,
    finishTime,
    projectId,
    taskId,
  };
};

export const del = () => {
  //
};
