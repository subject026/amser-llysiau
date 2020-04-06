import { combineReducers } from 'redux';
import { useSelector as useReduxSelector, TypedUseSelectorHook } from 'react-redux';
import appData from './appData';
import view from './view';

export default combineReducers({
  view,
  appData,
});

export const useSelector: TypedUseSelectorHook<TState> = useReduxSelector;
