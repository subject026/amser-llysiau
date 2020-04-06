import React from 'react';
import { useDispatch } from 'react-redux';
import styled, { createGlobalStyle } from 'styled-components';

import createProjectsObject from './util/dummyData';
import ProjectsView from './components/ProjectsView';
import ProjectView from './components/ProjectView';
import { HYDRATE_PROJECTS, VIEW_PROJECTS } from './actions';
import { useSelector } from './reducers';

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

const App: React.FC = (): React.ReactElement => {
  const appState = useSelector((state): TState => state);
  const dispatch = useDispatch();

  const {
    appData: { projects },
    view,
  } = appState;

  const loadDummyData = () => {
    const newProjects = createProjectsObject();
    dispatch(HYDRATE_PROJECTS(newProjects));
  };

  React.useEffect(() => {
    const localData = JSON.parse(localStorage.getItem('appData'));
    if (localData && Object.keys(localData.projects).length > 0) {
      dispatch(HYDRATE_PROJECTS(localData.projects));
    }
  }, []);

  React.useEffect(() => {
    const localData = JSON.parse(localStorage.getItem('appData'));
    if (!localData) {
      if (Object.keys(projects).length) {
        localStorage.setItem('appData', JSON.stringify(appState.appData));
      }
    }
  });

  return (
    <>
      <GlobalStyles />
      <Header>
        <h1>{view && view.projectId ? projects[view.projectId].title : ';'}</h1>
        {view && view.projectId && (
          <button type="button" onClick={() => dispatch(VIEW_PROJECTS())}>
            back to projects
          </button>
        )}
        {!Object.keys(projects).length && (
          <button type="button" onClick={loadDummyData}>
            load dummy data
          </button>
        )}
      </Header>
      {view.projectId && <ProjectView />}
      {!view.projectId && <ProjectsView />}
    </>
  );
};

export default App;
