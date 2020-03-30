import { v4 as uuid } from 'uuid';

import handleError from '../util/error';

/**
 *
 * @param title
 * @param projectId
 * @param githubIssue
 */

type TCreateTaskProps = {
  title: string;
  projectId: string;
  githubIssue: boolean;
};

export const create = (props: TCreateTaskProps): TTask => {
  const { title, projectId, githubIssue } = props;
  if (!title) handleError('Error! createNewTask() - no task title provided');
  if (!projectId) handleError('Error! createNewTask() - no projectId provided');

  const created = Date.now();

  return {
    id: uuid(),
    projectId,
    title,
    created,
    lastUpdated: created,
    sessions: {},
    githubIssue,
  };
};

export const update = (task: TTask, updates: TTaskUpdates): TTask => ({
  ...task,
  ...updates,
  lastUpdated: Date.now(),
});
