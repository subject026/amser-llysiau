import React from 'react';
import styled from 'styled-components';
// import { useDispatch } from 'react-redux';
// import { SELECT_TASK } from '../../state/actions';

const Card = styled.li`
  border: 2px solid #fff;
  display: flex;
  justify-content: space-between;
  &:hover {
    cursor: pointer;
    border: 2px solid grey;
  }
`;

const SessionText = styled.div`
  font-size: 18px;
  padding-right: 2rem;
`;

const SessionLength = styled.div`
  font-size: 16px;
`;

type TSessionCard = {
  session: TSession;
};

const formatSessionLength = (seconds: number): string => {
  if (seconds < 60) return `${seconds} seconds`;
  const mins = Math.round(seconds / 60);
  const secs = Math.round(seconds % 60);
  return `${mins} minutes${seconds ? ` ${secs} seconds` : null}`;
};
const SessionCard = (props: TSessionCard) => {
  const { session } = props;

  // const dispatch = useDispatch();
  const sessionLength = Math.round((session.finishTime - session.startTime) / 1000);
  return (
    <Card>
      <SessionText>{session.focus}</SessionText>
      <SessionLength>{formatSessionLength(sessionLength)}</SessionLength>
    </Card>
  );
};

export default SessionCard;
