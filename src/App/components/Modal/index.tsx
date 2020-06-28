import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { useSelector } from '../../state/reducers';

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

function Modal() {
  const appState = useSelector((state): TState => state);
  const dispatch = useDispatch();
  console.log('Modal.tsx - appState: ', appState);
  if (appState.modal)
    return (
      <Overlay>
        <ModalBox>
          <h2>Modal</h2>
          {/* <button onClick={dispatch()}></button> */}
        </ModalBox>
      </Overlay>
    );
}

export default Modal;
