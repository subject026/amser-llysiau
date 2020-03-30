import Entities from '../../entities';
import getRandomString from './randomString';

const { Task } = Entities;

export default (projectId: string): TTasks => {
  const tasksCount = Math.floor(Math.random() * 18) - 3;
  const tasksObject: TTasks = {};
  for (let i = 0; i < tasksCount; i += 1) {
    const newTask = Task.create({
      title: getRandomString(Math.random() * 10),
      projectId,
      githubIssue: false,
    });
    console.log(newTask);
    tasksObject[newTask.id] = newTask;
  }
  return tasksObject;
};
