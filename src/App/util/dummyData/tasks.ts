import Entities from '../../state/entities';
import getRandomString from './randomString';

const { Task, Session } = Entities;

export default (projectId: string, name: string): TTasks => {
  const tasksCount = Math.floor(Math.random() * 18) - 3;
  const tasksObject: TTasks = {};
  for (let i = 0; i < tasksCount; i += 1) {
    const newTask = Task.create({
      title: getRandomString(Math.random() * 10),
      projectId,
      githubIssue: false,
    });
    tasksObject[newTask.id] = newTask;
    if (name === 'project 1' && i === 0) {
      for (let i2 = 0; i2 < tasksCount; i2 += 1) {
        const newSession = Session.createSession({
          focus: getRandomString(Math.random() * 10),
          projectId,
          taskId: newTask.id,
          startTime: 200,
          finishTime: 10,
        });
        tasksObject[newTask.id].sessions[newSession.id] = newSession;
      }
    }
  }
  return tasksObject;
};
