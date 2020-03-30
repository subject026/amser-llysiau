import React from 'react';
import styled, { css } from 'styled-components';

const Section = styled.section`
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
      fill: ${props => (props.isStar ? 'yellow' : 'grey')};
    }
  }
`;

type TProjectsView = {
  projects: TProjects;
  selectProject: (projectId: string) => void;
};

const ProjectsView: React.FC<TProjectsView> = (props: TProjectsView): React.ReactElement => {
  const { projects, selectProject } = props;

  const handleOpenProjectClick = (projectId: string) => {
    selectProject(projectId);
  };

  const handleStarToggleClick = (projectId: string) => {
    console.log(projects[projectId].title);
  };

  return (
    <Section>
      {Object.keys(projects).map(projectId => {
        console.log(projectId); // eslint-disable-line
        const project = projects[projectId];
        return (
          <ProjectCard key={project.id}>
            <CardTitle>{project.title}</CardTitle>
            <ToggleStar isStar={project.isStar}>
              <button type="button" onClick={() => handleStarToggleClick(project.id)}>
                <svg width="20" height="19" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 15.27L16.18 19l-1.64-7.03L20 7.24l-7.19-.61L10 0 7.19 6.63 0 7.24l5.46 4.73L3.82 19 10 15.27z" />
                </svg>
              </button>
            </ToggleStar>
            <div>
              <button type="button" onClick={() => handleOpenProjectClick(projectId)}>
                open project
              </button>
            </div>
          </ProjectCard>
        );
      })}
    </Section>
  );
};

export default ProjectsView;
