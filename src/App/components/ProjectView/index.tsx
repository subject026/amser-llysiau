import React from 'react';
import styled, { css } from 'styled-components';
import { useDispatch } from 'react-redux';
import { useSelector } from '../../state/reducers';

import Form from '../styled/form';
import Wrapper from '../styled/wrapper';
import { CREATE_TASK } from '../../state/actions';
import { create as CreateTask } from '../../state/entities/task';
import { OPEN_MODAL } from '../../state/actions/view';
import TaskCard from './TaskCard';
import SessionCard from './SessionCard';
import Button from '../Button';
import ButtonGroup from '../styled/ButtonGroup';

type TSectionProps = {
  taskId: boolean | string;
};

const Section = styled.section`
  padding: 60px 0;
  @media (max-width: 699px) {
    padding: 0;
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
    grid-gap: ${(props) => props.theme.layout.base2};
    grid-template-rows: 1fr;
  }
`;

type TTaskViewProps = {
  taskId: boolean | string;
};

const TasksView = styled.div`
  background-color: #fff;
  h4 {
    margin: 0;
    padding: ${(props) => props.theme.layout.base2};
    background-color: ${(props) => props.theme.colors.grey200};
    color: ${(props) => props.theme.colors.grey800};
    font-size: 20px;
  }
  @media (max-width: 699px) {
    width: 100%;
    position: absolute;
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
  background-color: #fff;
  h4 {
    margin: 0;
    padding: ${(props) => props.theme.layout.base2};
    background-color: ${(props) => props.theme.colors.grey200};
    @media (min-width: 699px) {
      background-color: ${(props) => (props.taskId ? props.theme.colors.grey100 : props.theme.colors.grey200)};
    }
    color: ${(props) => props.theme.colors.grey800};
    font-size: 20px;
  }
  @media (max-width: 699px) {
    width: 100%;
    position: absolute;
    left: 0;
    transform: translateX(calc(100% + 45px));
    transition: visibility 300ms 0ms, opacity 200ms 100ms linear;
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

  li + li {
    margin-top: 32px;
  }

  @media (min-width: 700px) {
    grid-column-start: 2;
    grid-column-end: 3;
    grid-row-start: 2;
    grid-row-end: 3;
  }
`;

const SessionsInner = styled.section`
  padding: 32px;
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
      <Wrapper sm="0" md="32px">
        <Section taskId={view.taskId} key={id}>
          <TasksView taskId={view.taskId}>
            <h4>Tasks</h4>
            <Form onSubmit={handleFormSubmit}>
              <section>
                <div>
                  <label htmlFor="title">task title</label>
                  <textarea id="title" name="title" value={state.taskTitle} onChange={handleFormInputChange} />
                </div>
                <Button onClick={addTask} disabled={state.taskTitle.length < 1}>
                  add task
                </Button>
              </section>
            </Form>
            <ul>
              {Object.keys(tasks).map((taskKey) => {
                const task = tasks[taskKey];
                return <TaskCard key={task.id} task={task} isSelected={task.id == view.taskId} />;
              })}
            </ul>
          </TasksView>
          <SessionsView taskId={view.taskId}>
            <div>
              <h4>Sessions</h4>
              <SessionsInner>
                <ButtonGroup>
                  <Button
                    onClick={() => {
                      dispatch(
                        OPEN_MODAL({
                          type: 'timer',
                        }),
                      );
                    }}
                  >
                    new session
                  </Button>
                </ButtonGroup>
                <ul>
                  {(() => {
                    if (view.taskId) {
                      const { sessions } = tasks[view.taskId];
                      console.log('task sessions: ', sessions);

                      return Object.keys(sessions).map((key) => {
                        const session = sessions[key];
                        return <SessionCard key={session.id} session={session} />;
                      });
                    }
                    return <p>no sessions here yet</p>;
                  })()}
                </ul>
              </SessionsInner>
            </div>
          </SessionsView>
        </Section>
      </Wrapper>
    </>
  );
};

export default ProjectView;
