import React from 'react';
import styled, { css } from 'styled-components';
import { useDispatch } from 'react-redux';
import { SELECT_TASK } from '../../state/actions';

type TCard = {
  isSelected: boolean;
};

const Card = styled.li<TCard>`
  padding: 32px 0;
  &:hover {
    cursor: pointer;
  }
  h5 {
    margin: 0;
    font-size: 1rem;
    padding: 0 2rem;
  }
  ${(props) =>
    props.isSelected
      ? css`
          background-color: ${props.theme.colors.grey100};
          color: ${props.theme.colors.grey800};
        `
      : css`
          background-color: none;
          color: ${props.theme.colors.grey100};
        `}
`;

type TTaskCard = {
  task: TTask;
  isSelected: boolean;
};
const TaskCard = (props: TTaskCard) => {
  const { task, isSelected } = props;

  const dispatch = useDispatch();

  return (
    <Card isSelected={isSelected} onClick={() => dispatch(SELECT_TASK(task.id))}>
      <h5>{task.title}</h5>
    </Card>
  );
};

export default TaskCard;
