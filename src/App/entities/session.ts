import { v4 as uuid } from 'uuid';

import handleError from '../util/error';

export default (
  focus: string,
  startTime: number,
  finishTime: number,
  projectId: string,
  taskId: string,
): TSession | void => {
  if (!focus) return handleError('Error! createNewSession() - no focus provided');
  if (!startTime) return handleError('Error! createNewSession() - no start time provided');
  if (!finishTime) return handleError('Error! createNewSession() - no finish time provided');
  if (!projectId) return handleError('Error! createNewSession() - no projectId provided');
  if (!taskId) return handleError('Error! createNewSession() - no taskId provided');

  return {
    id: uuid(),
    focus,
    startTime,
    finishTime,
    projectId,
    taskId,
  };
};
