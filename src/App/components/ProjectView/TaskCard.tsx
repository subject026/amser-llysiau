import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { SELECT_TASK } from '../../state/actions';

const Card = styled.li`
  border: 2px solid #fff;
  &:hover {
    cursor: pointer;
    border: 2px solid grey;
  }
  h5 {
    font-size: 1rem;
    padding: 0 2rem;
  }
`;

type TTaskCard = {
  task: TTask;
};
const TaskCard = (props: TTaskCard) => {
  const { task } = props;

  const dispatch = useDispatch();

  return (
    <Card onClick={() => dispatch(SELECT_TASK(task.id))}>
      <h5>{task.title}</h5>
    </Card>
  );
};

export default TaskCard;
