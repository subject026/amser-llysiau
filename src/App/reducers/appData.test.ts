const { createStore } = require('redux');
const rootReducer = require('./index').default;

const initialState = rootReducer({}, { type: 'BLOOP', payload: {} });
console.log(initialState);

describe('Some stuff', () => {
  it('Should add a project', () => {
    expect(1).toBe(1);
  });
});
