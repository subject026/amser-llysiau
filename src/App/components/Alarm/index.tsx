import React from 'react';

const coinUrl = require('../../audio/coin.mp3');
import Settings from '../presentational/Settings';
import { TimerConsumer } from '../context/TimerProvider';

export interface TAlarmProps {
  startAlarm: () => void;
  stopAlarm: () => void;
}

const Alarm = (props: TAlarmProps) => {
  const [state, setState] = React.useState({
    data: null,
    alarmOn: false,
  });

  const ctx = new AudioContext();
  const gainNode = ctx.createGain();
  let source = ctx.createBufferSource();

  React.useEffect(() => {
    fetch(coinUrl)
      .then((res) => res.arrayBuffer())
      .then((data) => {
        setState((prevState) => {
          return {
            ...prevState,
            data,
          };
        });
      })
      .catch((err) => console.log('Could not load audio file!\n', err));
  }, []);

  const startAlarm = (willLoop = true) => {
    const volume = 5;

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
  };

  const stopAlarm = () => {
    source.stop();
    source = null;
    setState((prevState) => {
      return {
        ...prevState,
        alarmOn: false,
      };
    });
  };

  const { alarmOn } = state;
  return (
    <section className="alarm">
      <Timer startAlarm={startAlarm} stopAlarm={stopAlarm} alarmOn={alarmOn} />
      <Settings startAlarm={startAlarm} stopAlarm={stopAlarm} />
    </section>
  );
};

export default Alarm;
