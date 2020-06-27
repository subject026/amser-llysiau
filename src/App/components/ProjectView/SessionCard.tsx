import React from 'react';
import styled from 'styled-components';
// import { useDispatch } from 'react-redux';
// import { SELECT_TASK } from '../../state/actions';

const Card = styled.li`
  border: 2px solid #fff;
  &:hover {
    cursor: pointer;
    border: 2px solid grey;
  }
`;

type TSessionCard = {
  session: TSession;
};
const SessionCard = (props: TSessionCard) => {
  const { session } = props;

  // const dispatch = useDispatch();
  const sessionLength = (session.finishTime - session.startTime) / 1000;
  return (
    <Card>
      <h5>{session.focus}</h5>
      <span>length: {sessionLength}</span>
    </Card>
  );
};

export default SessionCard;
