import createProjectsObject from './projects';

const projectNames = [
  'project 1',
  'project 2',
  'project 3',
  'project 4',
  'project 5',
  'project 6',
  'project 7',
];

export default () => {
  const projects: TProjects = createProjectsObject(projectNames);

  return projects;
};
