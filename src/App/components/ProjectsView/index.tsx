import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';

import { useSelector } from '../../reducers';
import { PROJECT_STAR_TOGGLE, SELECT_PROJECT, CREATE_PROJECT } from '../../actions';
import { create as CreateProject } from '../../entities/project';
import Form from '../styled/form';

const Section = styled.section``;
const CardGrid = styled.section`
  padding: 15px;
  @media (min-width: 750px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr;
    grid-gap: 15px;
  }
`;

const ProjectCard = styled.article`
  display: grid;
  grid-template-columns: 6fr 1fr;
  grid-template-rows: 1fr 1fr;
`;

const CardTitle = styled.h2`
  grid-column-start: 1;
  grid-column-end: 2;
  grid-row-start: 1;
  grid-row-end: 2;
`;

const ToggleStar = styled.div`
  grid-column-start: 2;
  grid-column-end: 3;
  grid-row-start: 1;
  grid-row-end: 2;
  display: flex;
  align-items: center;
  button {
    display: flex;
    align-items: center;
    path {
      fill: ${(props: { isStar: boolean }) => (props.isStar ? 'yellow' : 'grey')};
    }
  }
`;

const ProjectsView: React.FC = (): React.ReactElement => {
  const {
    appData: { projects },
  } = useSelector(appState => appState);

  const [state, setState] = React.useState({ title: '' });

  const dispatch = useDispatch();

  const handleFormInputChange = (event: any): void => {
    const title = event.target.value;
    setState({ title });
  };

  const addProject = () => {
    if (state.title.length) {
      dispatch(CREATE_PROJECT(CreateProject({ title: state.title })));
      setState({ title: '' });
    }
  };

  const handleAddProject = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    addProject();
  };

  console.log('projectzz', projects);
  return (
    <Section>
      <Form onSubmit={handleAddProject}>
        <section>
          <label htmlFor="title">project title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={state.title}
            onChange={handleFormInputChange}
          />
          <button type="submit" onClick={addProject} disabled={state.title.length < 1}>
            add project
          </button>
        </section>
      </Form>
      {Object.keys(projects).length > 0 &&
        (() => {
          const { starred, notStarred } = Object.values(projects).reduce(
            (acc, project): any => {
              console.log(acc);
              if (project.isStar) {
                acc.starred.push(project);
              } else {
                acc.notStarred.push(project);
              }
              return acc;
            },
            {
              starred: [],
              notStarred: [],
            },
          );
          return (
            <>
              <CardGrid>
                {starred.map((project: TProject) => (
                  <ProjectCard key={project.id}>
                    <CardTitle>{project.title}</CardTitle>
                    <ToggleStar isStar={project.isStar}>
                      <button
                        type="button"
                        onClick={() => dispatch(PROJECT_STAR_TOGGLE(project.id))}
                      >
                        <svg width="20" height="19" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M10 15.27L16.18 19l-1.64-7.03L20 7.24l-7.19-.61L10 0 7.19 6.63 0 7.24l5.46 4.73L3.82 19 10 15.27z" />
                        </svg>
                      </button>
                    </ToggleStar>
                    <div>
                      <button type="button" onClick={() => dispatch(SELECT_PROJECT(project.id))}>
                        open project
                      </button>
                    </div>
                  </ProjectCard>
                ))}
              </CardGrid>
              <CardGrid>
                {notStarred.map((project: TProject) => (
                  <ProjectCard key={project.id}>
                    <CardTitle>{project.title}</CardTitle>
                    <ToggleStar isStar={project.isStar}>
                      <button
                        type="button"
                        onClick={() => dispatch(PROJECT_STAR_TOGGLE(project.id))}
                      >
                        <svg width="20" height="19" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M10 15.27L16.18 19l-1.64-7.03L20 7.24l-7.19-.61L10 0 7.19 6.63 0 7.24l5.46 4.73L3.82 19 10 15.27z" />
                        </svg>
                      </button>
                    </ToggleStar>
                    <div>
                      <button type="button" onClick={() => dispatch(SELECT_PROJECT(project.id))}>
                        open project
                      </button>
                    </div>
                  </ProjectCard>
                ))}
              </CardGrid>
            </>
          );
        })()}
    </Section>
  );
};

export default ProjectsView;
