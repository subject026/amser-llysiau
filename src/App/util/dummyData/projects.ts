import Entities from '../../entities';
// import getRandomString from './randomString';
import createTasksObject from './tasks';

const { Project } = Entities;

const createProjectsObject = (projectNames: string[]): TProjects => {
  const projects: TProjects = {};
  projectNames.forEach((name): void => {
    const project: TProject = Project.create({ title: name, githubRepo: false });

    projects[project.id] = project;

    // load some tasks
    projects[project.id].tasks = createTasksObject(project.id, name);
  });

  return projects;
};

export default createProjectsObject;
