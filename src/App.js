import { useState, useReducer, useEffect } from 'react'
import './App.css';
import TimerSettings from './components/timerSettings';
import TimerDisplay from './components/timerDisplay';

export const ACTIONS = {
  INCREMENT_SESSION: 'increment_session',
  INCREMENT_BREAK: 'increment_break',
  DECREMENT_SESSION: 'decrement_session',
  DECREMENT_BREAK: 'decrement_break',
  SET_MINUTES: 'set_minutes',
  COUNTDOWN: 'countdown',
  STOP_COUNTDOWN: 'stop_countdown',
  SET_COUNTDOWN: 'set_countdown',
  SET_PLAY_STOP: 'set_play_stop'
}



function reducer(state, { type, payload }) {


  switch (type) {
    case ACTIONS.INCREMENT_SESSION: if (state.sessionTime === 60) return state;

      return { ...state, sessionTime: state.sessionTime + 1, sessionMinutes: `${state.sessionTime + 1}`, minutesInDisplay: `${state.sessionTime + 1}`, seconds: '00' };

    case ACTIONS.INCREMENT_BREAK: if (state.breakTime === 60) return state;

      return { ...state, breakTime: state.breakTime + 1, breakMinutes: `${state.breakTime + 1}`, minutesInDisplay: `${state.sessionTime}  `, seconds: '00' };

    case ACTIONS.DECREMENT_SESSION: if (state.sessionTime === 1) return state;

      return { ...state, sessionTime: state.sessionTime - 1, sessionMinutes: `${state.sessionTime - 1}`, minutesInDisplay: `${state.sessionTime - 1}`, seconds: '00' };

    case ACTIONS.DECREMENT_BREAK: if (state.breakTime === 1) return state;

      return { ...state, breakTime: state.breakTime - 1, breakMinutes: `${state.breakTime - 1}`, minutesInDisplay: `${state.sessionTime}`, seconds: '00' };

    case ACTIONS.SET_DISPLAY: if(payload.session === 'session')
      return {...state, minutesInDisplay: Math.round(payload.inSeconds / 60000)}
    }
  }



function App() {

  const [{ sessionTime, breakTime, minutesInDisplay, seconds }, dispatch] = useReducer(reducer, { sessionTime: 25, breakTime: 5, minutesInDisplay: '25', seconds: '00', sessionEnded: false, play_stop: false })

  const [play_stop, setPlay_stop] = useState(false);

  const [time, setTime] = useState();
  const [session, setSession] = useState('session');
  const [countdown, setCountdown] = useState();
  const [inSeconds, setInSeconds] = useState(0);
  const [intervalId, setIntervalId] = useState();



  useEffect(() => {
    let id;
    if (play_stop) {
      let t;
      t = new Date();
      if(session === 'session'){
        t.setSeconds(t.getSeconds() + (sessionTime * 60000))
      }
      else if(session === 'break'){
        t.setSeconds(t.getSeconds() + (breakTime * 60000))
      };
        setTime(t.valueOf());
      if (time)
        id = setInterval(() => {
          setCountdown(new Date().valueOf())
        }, 100)
      setIntervalId(id);
    } else {
      clearInterval(id);
    }
    return () => {
      clearInterval(id);
    }
  }, [play_stop, time]);

  useEffect(() => {
    if (time && countdown) {
      const timeInSeconds = Math.floor((time - countdown) / 1000);
      if (inSeconds !== timeInSeconds) {
        setInSeconds(timeInSeconds);
      }
    }
  }, [countdown]);

  useEffect(() => {
    console.log(Math.round(inSeconds / 60000))
    if (inSeconds <=  0) {
      clearInterval(intervalId);
      setSession('break');
    }
  }, [inSeconds])


  return (
    <div id='App' className='d-flex flex-column justify-content-center align-content-center app'>
      <div id='clock' className='d-flex flex-column justify-content-center align-content-center clock'>
        <div id='timer-settings' className='d-flex timer-settings'>
          <TimerSettings dispatch={dispatch} sessionTime={sessionTime} breakTime={breakTime} />
        </div>
        <div id='time-display'>
          <TimerDisplay minutesInDisplay={minutesInDisplay} secondsInDisplay={seconds} />
        </div>
        <div id='buttons'>
          <div id='start-stop' onClick={() => { setPlay_stop(!play_stop);}}>start-stop</div>
          <div id='reset'>reset</div>
        </div>
      </div>
    </div>
  );
}

export default App;
