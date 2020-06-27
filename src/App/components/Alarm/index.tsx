// import React from 'react';

import coinUrl from '../../../static/audio/coin.mp3';

export interface TAlarmState {
  data: any;
  alarmOn: boolean;
}
let state: TAlarmState = {
  data: false,
  alarmOn: false,
};

const setState = (cb: Function): void => {
  state = cb(state);
};

let init = false;
const ctx = new AudioContext();
const gainNode = ctx.createGain();
let source = ctx.createBufferSource();

const useAlarm = () => {
  if (!init) {
    console.log('alarm init...');
    fetch(coinUrl)
      .then((res) => res.arrayBuffer())
      .then((data) => {
        console.log(typeof data);
        setState((prevState: TAlarmState) => {
          return {
            ...prevState,
            data,
          };
        });
      })
      .catch((err) => console.log('Could not load audio file!\n', err));
    init = true;
  }
  return {
    startAlarm(willLoop = true) {
      const volume = 30;

      const { data } = state;
      console.log('dataAAaaaa: ', data);
      const dataCloned = data.slice(0);
      ctx.decodeAudioData(data, (buffer) => {
        console.log('bufferbufferbuffer', buffer);
        source.buffer = buffer;
        source.playbackRate.value = 2;
        source.loop = willLoop; // use his for setting state too as if false we don't need to update alarmOn state
        gainNode.gain.setValueAtTime(volume, ctx.currentTime);
        source.connect(gainNode);
        gainNode.connect(ctx.destination);
        source.start();
        setState((prevState: TAlarmState) => {
          return {
            ...prevState,
            data: dataCloned,
            alarmOn: willLoop,
          };
        });
      });
    },
    stopAlarm() {
      source.stop();
      source = null;
      setState((prevState: TAlarmState) => {
        return {
          ...prevState,
          alarmOn: false,
        };
      });
    },
  };
};

export default useAlarm;
