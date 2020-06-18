import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { useSelector } from '../../state/reducers';

function Example() {
  const appState = useSelector((state): TState => state);
  return (
    <div>
      <h2>Example</h2>
    </div>
  );
}

export default Example;
