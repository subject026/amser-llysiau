import React from 'react';
import styled from 'styled-components';

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

type TProjectView = {
  project: TProject;
  view: TViewState;
  selectTask: (taskId: string) => void;
};

const ProjectView: React.FC<TProjectView> = (props: TProjectView): React.ReactElement => {
  const [projectViewState, setprojectViewState] = React.useState({ taskId: '' });

  const handleSelectTaskClick = (taskId: string): void => {
    setprojectViewState(state => ({
      ...state,
      view: {
        taskId,
      },
    }));
  };

  const {
    project: { title, tasks, id },
  } = props;
  const { taskId } = projectViewState;
  return (
    <Section key={id}>
      <ProjectHeader>
        <h3>{title}</h3>
      </ProjectHeader>
      <TasksView>
        <h4>tasks:</h4>
        <ul>
          {Object.keys(tasks).map(taskKey => {
            const task = tasks[taskKey];
            return (
              <li key={task.id}>
                <h5>{task.title}</h5>
                <button type="button" onClick={() => handleSelectTaskClick(task.id)}>
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
            if (taskId) {
              const { sessions } = tasks[taskId];
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
