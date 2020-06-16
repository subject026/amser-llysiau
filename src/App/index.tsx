import React from 'react';
import { useDispatch } from 'react-redux';
import styled, { createGlobalStyle } from 'styled-components';

import createProjectsObject from './util/dummyData';
import { HYDRATE_PROJECTS, VIEW_PROJECTS, VIEW_BACK } from './actions';
import { useSelector } from './reducers';

import Wrapper from './components/styled/wrapper';
import ProjectsView from './components/ProjectsView';
import ProjectView from './components/ProjectView';
import TimerModal from './components/TimerModal/index';

const GlobalStyles = createGlobalStyle`
* {
  box-sizing: border-box;
}

  body {
    margin: 0;
    overflow-y: scroll;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    overflow-x: hidden;
  }
`;

const Header = styled.header`
  background-color: lightcoral;
  padding: 20px 0;
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
    // initial load
    //
    // get local data and load into app state
    const localData = JSON.parse(localStorage.getItem('appData'));
    if (localData && Object.keys(localData.projects).length > 0) {
      dispatch(HYDRATE_PROJECTS(localData.projects));
    }
    if (!localData) {
      loadDummyData();
    }
  }, []);

  React.useEffect(() => {
    const localData = JSON.parse(localStorage.getItem('appData'));
    console.log('Locals dater: ', localData);
    console.log(appState);
    if (!localData) {
      if (Object.keys(projects).length) {
        localStorage.setItem('appData', JSON.stringify(appState.appData));
      }
    }
  });

  return (
    <>
      <GlobalStyles />
      {view.timerIsOpen && <TimerModal />}
      <Header>
        <Wrapper>
          <h1>{view.projectId ? projects[view.projectId].title : ';'}</h1>
          {view.projectId && (
            <>
              <button type="button" onClick={() => dispatch(VIEW_PROJECTS())}>
                back to projects
              </button>
              <button type="button" onClick={() => dispatch(VIEW_BACK())}>
                back
              </button>
            </>
          )}
          {/* {!Object.keys(projects).length && (
            <button type="button" onClick={loadDummyData}>
              load dummy data
            </button>
          )} */}
        </Wrapper>
      </Header>
      {view.projectId && <ProjectView />}
      {!view.projectId && <ProjectsView />}
    </>
  );
};

export default App;
