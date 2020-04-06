import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { useSelector } from '../../reducers';

import Form from '../styled/form';
import { SELECT_TASK, CREATE_TASK } from '../../actions';
import { create as CreateTask } from '../../entities/task';

const Section = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
`;

const ProjectHeader = styled.div`
  grid-column-start: 1;
  grid-column-end: 3;
  grid-row-start: 1;
  grid-row-end: 2;
`;

const TasksView = styled.div`
  grid-column-start: 1;
  grid-column-end: 2;
  grid-row-start: 2;
  grid-row-end: 3;
`;
const SessionsView = styled.div`
  grid-column-start: 2;
  grid-column-end: 3;
  grid-row-start: 2;
  grid-row-end: 3;
`;

const ProjectView: React.FC = (): React.ReactElement => {
  const { view, appData } = useSelector(state => state);
  const dispatch = useDispatch();

  const [state, setState] = React.useState({ taskTitle: '' });

  const handleFormInputChange = (event: any): void => {
    const taskTitle = event.target.value;
    setState({ taskTitle });
  };

  const addTask = () => {
    if (state.taskTitle.length) {
      dispatch(
        CREATE_TASK(
          CreateTask({ title: state.taskTitle, projectId: view.projectId, githubIssue: false }),
        ),
      );
      setState({ taskTitle: '' });
    }
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    addTask();
  };

  const { tasks, id } = appData.projects[view.projectId];
  // console.log('title ', title);

  return (
    <Section key={id}>
      <ProjectHeader>
        <Form onSubmit={handleFormSubmit}>
          <section>
            <label htmlFor="title">project title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={state.taskTitle}
              onChange={handleFormInputChange}
            />
            <button type="submit" onClick={addTask} disabled={state.taskTitle.length < 1}>
              add task
            </button>
          </section>
        </Form>
      </ProjectHeader>
      <TasksView>
        <h4>tasks:</h4>
        <ul>
          {Object.keys(tasks).map(taskKey => {
            const task = tasks[taskKey];
            return (
              <li key={task.id}>
                <h5>{task.title}</h5>
                <button type="button" onClick={() => dispatch(SELECT_TASK(task.id))}>
                  select task
                </button>
              </li>
            );
          })}
        </ul>
      </TasksView>
      <SessionsView>
        <div>
          <p>sessionzz</p>
          {() => {
            if (view.taskId) {
              const { sessions } = tasks[view.taskId];
              return Object.keys(sessions).map(key => {
                const { focus } = sessions[key];
                return (
                  <section>
                    <span>{focus}</span>
                  </section>
                );
              });
            }
            return <p>no sessions here yet</p>;
          }}
        </div>
      </SessionsView>
    </Section>
  );
};

export default ProjectView;
