const initialState: TState = {
  appData: {
    projects: {},
  },
  view: { timerIsOpen: false },
  modal: {
    open: false,
    type: 'addTask',
    data: {
      bloop: 'dataaa',
    },
  },
};

export default initialState;
