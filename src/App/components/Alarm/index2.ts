import React, { Component } from 'react';

import coinUrl from '../../../static/audio/coin.mp3';

import error from 'src/App/util/error';

interface TTimerState {
  data: null;
  alarmOn: boolean;
}

let state: TTimerState = {
  data: null,
  alarmOn: false,
};

const setState = (cb: Function): void => {
  state = { ...cb(state) };
};

const useAlarm = () => {
  const ctx = new AudioContext();
const gainNode = ctx.createGain();
const source = ctx.createBufferSource();
  // init alarm
  fetch(coinUrl)
    .then((res) => res.arrayBuffer())
    .then((data) => {
      setState((prevState: TTimerState) => {
        return {
          ...prevState,
          data,
        };
      });
    })
    .catch((err) => {
      error('Could not load audio file!'));

  return {
    start(willLoop = true) {
      const volume
      
      
      
      const { data } = state;
      const dataCloned = data.slice(0);
      ctx.decodeAudioData(data, (buffer) => {
        source.buffer = buffer;
        source.playbackRate.value = 2;
        source.loop = willLoop; // use his for setting state too as if false we don't need to update alarmOn state
        gainNode.gain.setValueAtTime(volume, ctx.currentTime);
        source.connect(gainNode);
        gainNode.connect(ctx.destination);
        source.start();
        setState((prevState) => {
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
      setState((prevState) => {
        return {
          ...prevState,
          alarmOn: false,
        };
      });
    },

    // render() {
    //   const { alarmOn } = state;
    //   return (
    //     <section className="alarm">
    //     <Timer
    //     startAlarm={startAlarm}
    //     stopAlarm={stopAlarm}
    //     alarmOn={alarmOn}
    //     />
    //     <Settings startAlarm={startAlarm} stopAlarm={stopAlarm} />
    //     </section>
    //     );
    //   }
  };
};

export default useAlarm;
