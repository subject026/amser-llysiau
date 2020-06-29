import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { useSelector } from '../../state/reducers';

import TimerModal from './TimerModal';

const Overlay = styled.div`
  position: fixed;
  width: 100vw;
  min-height: 100vh;
  background-color: #202020;
  display: flex;
  align-items: center;
`;

const ModalBox = styled.section`
  background-color: #fff;
  width: 500px;
  height: 500px;
`;

enum ModalTypes {
  TIMER = 'TIMER',
}

const Modal = () => {
  const appState = useSelector((state): TState => state);
  const { modal } = appState;
  console.log('Modal.tsx - appState: ', appState);
  if (modal) {
    switch (modal.type) {
      case ModalTypes.TIMER:
        return <TimerModal />;
      default:
        return null;
    }
  }
};

export default Modal;
