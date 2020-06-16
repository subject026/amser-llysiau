import React from 'react';
import styled, { css } from 'styled-components';
import { useDispatch } from 'react-redux';
import { useSelector } from '../../reducers';

import Form from '../styled/form';
import Wrapper from '../styled/wrapper';
import { SELECT_TASK, CREATE_TASK } from '../../actions';
import { create as CreateTask } from '../../entities/task';
import { OPEN_MODAL } from '../../actions/view';

type TSectionProps = {
  taskId: boolean | string;
};

const Section = styled.section`
  @media (max-width: 699px) {
    position: relative;
    transition: transform 100ms ease-out;
    ${(props: TSectionProps) => {
      if (props.taskId) {
        return css`
          transform: translateX(-100vw);
        `;
      }
      return null;
    }}
  }

  @media (min-width: 700px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr;
  }
`;

const ProjectHeader = styled.div`
  @media (min-width: 700px) {
    grid-column-start: 1;
    grid-column-end: 3;
    grid-row-start: 1;
    grid-row-end: 2;
  }
`;

type TTaskViewProps = {
  taskId: boolean | string;
};

const TasksView = styled.div`
  ul {
    padding: 0;
    list-style-type: none;
  }
  @media (max-width: 699px) {
    width: 100%;
    position: absolute;
    border: 2px solid blue;
    transition: visibility 300ms 0ms, opacity 200ms 100ms linear;
    ${(props: TTaskViewProps) => {
      if (props.taskId) {
        return css`
          opacity: 0;
          /* visibility: hidden; */
          transition: opacity 100ms linear, visibility 0ms 0ms;
        `;
      }
      return null;
    }};
  }
  @media (min-width: 700px) {
    grid-column-start: 1;
    grid-column-end: 2;
    grid-row-start: 2;
    grid-row-end: 3;
  }
`;

type TSessionsViewProps = {
  taskId: boolean | string;
};

const SessionsView = styled.div`
  @media (max-width: 699px) {
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
    transform: translateX(calc(100% + 45px));
    transition: visibility 300ms 0ms, opacity 200ms 100ms linear;
    border: 10px double pink;
    ${(props: TSessionsViewProps) => {
      if (!props.taskId) {
        return css`
          /* visibility: hidden; */
          opacity: 0;
          transition: opacity 100ms linear, visibility 0ms 0ms;
        `;
      }
      return null;
    }}
  }

  @media (min-width: 700px) {
    grid-column-start: 2;
    grid-column-end: 3;
    grid-row-start: 2;
    grid-row-end: 3;
  }
`;

const SessionSection = styled.section`
  background-color: #ffaaff;
  padding: 30px 0;
  & + section {
    margin-top: 30px;
  }
`;

const ProjectView: React.FC = (): React.ReactElement => {
  const { view, appData } = useSelector((state) => state);
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
          CreateTask({
            title: state.taskTitle,
            projectId: view.projectId,
            githubIssue: false,
          }),
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
  console.log(view);

  return (
    <>
      <ProjectHeader>
        <Wrapper>{/* // */}</Wrapper>
      </ProjectHeader>
      <Wrapper>
        <Section taskId={view.taskId} key={id}>
          <TasksView taskId={view.taskId}>
            <h4>tasks</h4>
            <Form onSubmit={handleFormSubmit}>
              <section>
                <label htmlFor="title">task title</label>
                <input type="text" id="title" name="title" value={state.taskTitle} onChange={handleFormInputChange} />
                <button type="submit" onClick={addTask} disabled={state.taskTitle.length < 1}>
                  add task
                </button>
              </section>
            </Form>
            <ul>
              {Object.keys(tasks).map((taskKey) => {
                const task = tasks[taskKey];
                return (
                  <li key={task.id}>
                    <button type="button" onClick={() => dispatch(SELECT_TASK(task.id))}>
                      <h5>{task.title}</h5>
                    </button>
                  </li>
                );
              })}
            </ul>
          </TasksView>
          <SessionsView taskId={view.taskId}>
            <div>
              <p>sessionzz</p>
              <button
                type="button"
                onClick={() => {
                  dispatch(OPEN_MODAL());
                }}
              >
                new session
              </button>
              {(() => {
                if (view.taskId) {
                  const { sessions } = tasks[view.taskId];
                  console.log('task sessions: ', sessions);

                  return Object.keys(sessions).map((key) => {
                    const { focus } = sessions[key];
                    return (
                      <SessionSection>
                        <span>{focus}</span>
                      </SessionSection>
                    );
                  });
                }
                return <p>no sessions here yet</p>;
              })()}
            </div>
          </SessionsView>
        </Section>
      </Wrapper>
    </>
  );
};

export default ProjectView;
