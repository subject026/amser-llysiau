import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';

import createProjectsObject from './util/dummyData';
import ProjectsView from './components/ProjectsView';
import ProjectView from './components/ProjectView';

const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    overflow-y: scroll;
  }
`;

const Header = styled.header`
  background-color: lightcoral;
  padding: 20px 15px;
  h1 {
    font-size: 40px;
    margin: none;
  }
`;

const initialState: TState = { appData: { projects: {} }, view: {} };

export default (): React.ReactElement => {
  const [appState, setAppState] = React.useState<TState>(initialState);

  const backToProjects = () => {
    setAppState(state => ({
      ...state,
      view: {},
    }));
  };

  const selectProject = (projectId: string): void => {
    setAppState(state => ({
      ...state,
      view: {
        projectId,
      },
    }));
  };

  const selectTask = (taskId: string): void => {
    setAppState(state => ({
      ...state,
      view: {
        ...state.view,
        taskId,
      },
    }));
  };

  React.useEffect(() => {
    const appData = JSON.parse(localStorage.getItem('appData'));
    if (appData && Object.keys(appData.projects).length > 0) {
      setAppState(state => {
        const newState: TState = {
          ...state,
          appData: { ...appData },
        };
        return newState;
      });
    } else {
      setAppState(state => {
        const newState: TState = {
          ...state,
          appData: { projects: createProjectsObject() },
        };

        localStorage.setItem('appData', JSON.stringify(newState.appData));

        return newState;
      });
    }
  }, []);

  const {
    view,
    appData: { projects },
  } = appState;
  console.log(appState);
  return (
    <>
      <GlobalStyles />
      {!view.projectId && (
        <>
          <Header>
            <h1>;)</h1>
          </Header>
          <ProjectsView projects={projects} selectProject={selectProject} />
        </>
      )}
      {view.projectId && (
        <>
          <Header>
            <h1>{projects[view.projectId].title}</h1>
            <button type="button" onClick={backToProjects}>
              back to projects
            </button>
          </Header>
          <ProjectView view={view} project={projects[view.projectId]} selectTask={selectTask} />
        </>
      )}
    </>
  );
};
