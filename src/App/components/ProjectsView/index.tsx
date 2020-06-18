import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';

import { useSelector } from '../../state/reducers';
import { PROJECT_STAR_TOGGLE, SELECT_PROJECT, CREATE_PROJECT } from '../../state/actions';
import { create as CreateProject } from '../../state/entities/project';
import Form from '../styled/form';
import Wrapper from '../styled/wrapper';
import Input from '../styled/Input';
import { StarToggleButton } from '../Button';
import Button from '../Button';

const Section = styled.section``;
const CardGrid = styled.section`
  padding: 15px 0;
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
`;

const ProjectsView: React.FC = (): React.ReactElement => {
  const {
    appData: { projects },
  } = useSelector((appState) => appState);

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

  return (
    <Section>
      <Form onSubmit={handleAddProject}>
        <Wrapper>
          <section>
            <label htmlFor="title">project title</label>
            <Input type="text" id="title" name="title" value={state.title} onChange={handleFormInputChange} />
            <Button onClick={addProject} disabled={state.title.length < 1}>
              add project
            </Button>
          </section>
        </Wrapper>
      </Form>
      {Object.keys(projects).length > 0 &&
        (() => {
          const { starred, notStarred } = Object.values(projects).reduce(
            (acc, project): any => {
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
            <Wrapper>
              <CardGrid>
                {starred.map((project: TProject) => {
                  console.log(project.isStar);
                  return (
                    <ProjectCard key={project.id}>
                      <CardTitle>{project.title}</CardTitle>
                      <ToggleStar>
                        <StarToggleButton
                          isStar={project.isStar}
                          onClick={() => dispatch(PROJECT_STAR_TOGGLE(project.id))}
                        />
                      </ToggleStar>
                      <div>
                        <Button onClick={() => dispatch(SELECT_PROJECT(project.id))}>open project</Button>
                      </div>
                    </ProjectCard>
                  );
                })}
              </CardGrid>
              <CardGrid>
                {notStarred.map((project: TProject) => (
                  <ProjectCard key={project.id}>
                    <CardTitle>{project.title}</CardTitle>
                    <StarToggleButton
                      isStar={project.isStar}
                      onClick={() => dispatch(PROJECT_STAR_TOGGLE(project.id))}
                    />

                    <div>
                      <Button
                        onClick={() => {
                          dispatch(SELECT_PROJECT(project.id));
                        }}
                      >
                        open project
                      </Button>
                    </div>
                  </ProjectCard>
                ))}
              </CardGrid>
            </Wrapper>
          );
        })()}
    </Section>
  );
};

export default ProjectsView;
