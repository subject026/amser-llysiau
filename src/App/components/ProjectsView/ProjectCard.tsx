import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { PROJECT_STAR_TOGGLE, SELECT_PROJECT, CREATE_PROJECT, DELETE_PROJECT } from '../../state/actions';

import ButtonGroup from '../styled/ButtonGroup';
import { StarToggleButton } from '../Button';
import Button from '../Button';

const Card = styled.article`
  display: grid;
  grid-template-columns: 6fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-row-gap: 1rem;
`;

const CardTitle = styled.h2`
  grid-column-start: 1;
  grid-column-end: 2;
  grid-row-start: 1;
  grid-row-end: 2;
  font-size: 2rem;
`;

const ToggleStar = styled.div`
  grid-column-start: 2;
  grid-column-end: 3;
  grid-row-start: 1;
  grid-row-end: 2;
  display: flex;
  align-items: center;
`;

type TProjectCard = {
  key: string;
  project: TProject;
};

const ProjectCard = (props: TProjectCard) => {
  const { project } = props;
  const dispatch = useDispatch();
  console.log(project);
  return (
    <Card key={project.id}>
      <CardTitle>{project.title}</CardTitle>
      <ToggleStar>
        <StarToggleButton isStar={project.isStar} onClick={() => dispatch(PROJECT_STAR_TOGGLE(project.id))} />
      </ToggleStar>
      <div>
        <ButtonGroup>
          <Button onClick={() => dispatch(SELECT_PROJECT(project.id))}>open project</Button>
          <Button buttonStyle="outline" onClick={() => dispatch(DELETE_PROJECT(project))}>
            delete project
          </Button>
        </ButtonGroup>
      </div>
    </Card>
  );
};

export default ProjectCard;
