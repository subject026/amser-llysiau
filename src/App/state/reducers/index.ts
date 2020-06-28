import { combineReducers } from 'redux';
import { useSelector as useReduxSelector, TypedUseSelectorHook } from 'react-redux';
import appData from './appData';
import view from './view';
import modal from './modal';

export default combineReducers({
  view,
  appData,
  modal,
});

export const useSelector: TypedUseSelectorHook<TState> = useReduxSelector;
