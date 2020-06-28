const initialState: TState = {
  appData: {
    projects: {},
  },
  view: { timerIsOpen: false },
  modal: {
    open: true,
    type: 'addTask',
    data: {
      bloop: 'dataaa',
    },
  },
};

export default initialState;
