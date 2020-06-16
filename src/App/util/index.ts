import handleError from './error';
import createProjectsObject from './dummyData';

const loadDummyData = () => {
  const projects: TProjects = createProjectsObject();

  return projects;
};

export default {
  handleError,
  loadDummyData,
};
