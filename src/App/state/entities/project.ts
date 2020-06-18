import { v4 as uuid } from 'uuid';

import handleError from '../../util/error';

/**
 *
 * @param title string
 * @param githubRepo boolean
 */

// create new project

type TCreateProjectProps = {
  title: string;
  githubRepo?: boolean;
  isStar?: boolean;
};

export const create = (props: TCreateProjectProps): TProject => {
  const { title } = props;
  let { githubRepo, isStar } = props;
  githubRepo = githubRepo || false;
  isStar = isStar || false;
  if (!title || !title.length) handleError('Error! createNewProject() - no project title provided');

  const created = Date.now();

  return {
    id: uuid(),
    title,
    created,
    lastUpdated: created,
    tasks: {},
    githubRepo,
    isStar,
  };
};

export const update = (project: TProject, updates: TProjectUpdates): TProject => ({
  ...project,
  ...updates,
  lastUpdated: Date.now(),
});
