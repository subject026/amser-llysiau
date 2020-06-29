import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { Knob } from 'react-rotary-knob';

import { CREATE_SESSION, CLOSE_MODAL } from '../../state/actions';
import { useSelector } from '../../state/reducers';
import { createSession } from '../../state/entities/session';
import handleError from '../../util/error';
import useAlarm from '../Alarm';

const Modal = styled.section`
  z-index: 10;
  position: fixed;
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(10, 10, 10, 0.95);
  color: #ddd;
`;

const Timer = styled.div``;

// const Focus = styled.div`
//   font-size: 28px;
// `;

const Clock = styled.div`
  span {
    font-size: 80px;
  }
`;

enum TimerStates {
  INIT,
  RUNNING,
  STOPPED,
  FINISHED,
}

type TTimerState = {
  sessionLengthMinutes: number;
  focus: string;
  sessionLength: number | null;
  startTime: number | null;
  finishTime: number | null;
  secondsRemaining: number | null;
  timerState: TimerStates;
  alarmOn: boolean;
};

const initialState: TTimerState = {
  sessionLengthMinutes: 0,
  focus: '',
  sessionLength: null,
  startTime: null,
  finishTime: null,
  secondsRemaining: null,
  timerState: TimerStates.INIT,
  alarmOn: false,
};

/* states

- init
-> timer ready to go, session length adjustable

- running
-> timer ticking down
- user can stop timer

- stopped
-> user has stopped timer before end of session
- either continue / reset / log partial

- finished
-> user can save complete session or reset

*/

const TimerModal: React.FC = (): React.ReactElement => {
  const {
    view: { projectId, taskId },
  } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [state, setState] = React.useState<TTimerState>(initialState);

  const { startAlarm, stopAlarm } = useAlarm();

  const interval = React.useRef(null);
  let lastTick: number;

  const handleFocusInputChange = (event: any): void => {
    const {
      target: { value },
    } = event;

    setState((prevState) => ({
      ...prevState,
      focus: value,
    }));
  };

  const handleSessionLengthInputChange = (value: any): void => {
    // ignore change if distance is greater than defined
    // here we use a distance of 200 because our max value is 1000
    // change if needed
    const maxDistance = 6;
    const distance = Math.abs(value - state.sessionLengthMinutes);
    if (distance <= maxDistance) {
      setState((prevState) => ({
        ...prevState,
        sessionLengthMinutes: value,
      }));
    }
  };

  const finishTimer = () => {
    window.clearInterval(interval.current);
    startAlarm();
    setTimeout(() => {
      stopAlarm();
    }, 5000);
    setState((prevState) => ({
      ...prevState,
      timerState: TimerStates.FINISHED,
      finishTime: Date.now(),
    }));
  };

  const tick = () => {
    if (Date.now() - lastTick > 1000) {
      console.log('lastTick: ', lastTick);
      let newSecondsRemaining;
      setState((prevState) => {
        newSecondsRemaining = prevState.secondsRemaining - 1;
        return {
          ...prevState,
          secondsRemaining: newSecondsRemaining,
        };
      });
      lastTick = Date.now();
      if (newSecondsRemaining === 0) {
        finishTimer();
      }
    }
  };

  const handleStartClick = () => {
    setState(
      (prevState): TTimerState => {
        // const secondsRemaining = prevState.sessionLengthMinutes * 60;
        const secondsRemaining = 63;
        return {
          ...prevState,
          timerState: TimerStates.RUNNING,
          secondsRemaining,
          startTime: Date.now(),
        };
      },
    );

    lastTick = Date.now();
    interval.current = setInterval(tick, 20);
  };

  const handleStopButtonClick = () => {
    window.clearInterval(interval.current);
    setState((prevState) => ({
      ...prevState,
      timerState: TimerStates.STOPPED,
    }));
  };

  const handleContinueButtonClick = () => {
    lastTick = Date.now();
    interval.current = setInterval(tick, 20);
    setState((prevState) => ({
      ...prevState,
      timerState: TimerStates.RUNNING,
    }));
  };

  const handleClearTimerButtonClick = () => {
    setState(() => ({
      ...initialState,
      secondsRemaining: initialState.sessionLengthMinutes * 60,
    }));
  };

  const handleCloseTimerModal = () => {
    dispatch(CLOSE_MODAL());
  };

  const handleLogSessionButtonClick = () => {
    const { focus, startTime, finishTime } = state;
    try {
      const newSession = createSession({
        focus,
        startTime,
        finishTime,
        projectId,
        taskId,
      });

      dispatch(CREATE_SESSION(newSession));
      handleCloseTimerModal();
    } catch (err) {
      handleError(err);
    }
  };

  React.useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      secondsRemaining: state.sessionLengthMinutes * 60,
    }));
  }, []);

  const { focus, timerState, secondsRemaining, sessionLengthMinutes } = state;
  const clockMins = Math.floor(timerState !== TimerStates.INIT ? secondsRemaining / 60 : sessionLengthMinutes);
  let clockSecs;
  if (timerState !== TimerStates.INIT) {
    clockSecs = secondsRemaining % 60 < 10 ? `0${secondsRemaining % 60}` : secondsRemaining % 60;
  } else {
    clockSecs = 0;
  }

  return (
    <Modal>
      <Timer>
        <Clock>
          <span>{clockMins}</span>
          <span>:</span>
          <span>{clockSecs}</span>
        </Clock>
        {timerState === TimerStates.INIT && (
          <>
            <textarea maxLength={50} value={focus} onChange={handleFocusInputChange} placeholder={"what's your focus?"}>
              {focus}
            </textarea>
            <Knob
              style={{ display: 'block' }}
              min={0}
              max={60}
              unlockDistance={50}
              value={sessionLengthMinutes}
              onChange={handleSessionLengthInputChange}
              width="500"
              height="500"
            />

            <button type="button" onClick={handleStartClick}>
              start
            </button>
            <button type="button" onClick={handleCloseTimerModal}>
              close
            </button>
          </>
        )}
        {timerState === TimerStates.RUNNING && (
          <>
            <h1>{focus}</h1>
            <button type="button" onClick={handleStopButtonClick}>
              stop
            </button>
          </>
        )}
        {timerState === TimerStates.STOPPED && (
          <>
            <h1>{focus}</h1>
            <button type="button" onClick={handleContinueButtonClick}>
              continue
            </button>
            <button type="button" onClick={handleClearTimerButtonClick}>
              clear timer
            </button>
          </>
        )}
        {timerState === TimerStates.FINISHED && (
          <>
            <h1>{focus}</h1>
            <button type="button" onClick={handleLogSessionButtonClick}>
              log session
            </button>
            <button type="button" onClick={handleClearTimerButtonClick}>
              clear timer
            </button>
          </>
        )}
      </Timer>
    </Modal>
  );
};

export default TimerModal;
