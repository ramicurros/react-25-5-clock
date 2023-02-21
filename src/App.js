import { useState, useReducer, useEffect } from 'react'
import './App.css';
import TimerSettings from './components/timerSettings';
import TimerDisplay from './components/timerDisplay';

export const ACTIONS = {
  INCREMENT_SESSION: 'increment_session',
  INCREMENT_BREAK: 'increment_break',
  DECREMENT_SESSION: 'decrement_session',
  DECREMENT_BREAK: 'decrement_break',
  SET_DISPLAY: 'set_display'
}



function reducer(state, { type, payload }) {


  switch (type) {
    case ACTIONS.INCREMENT_SESSION: if (state.sessionTime === 60) return state;
      if (state.sessionTime < 9) {
        return { ...state, sessionTime: state.sessionTime + 1, sessionMinutes: `${state.sessionTime + 1}`, minutesInDisplay: `0${state.sessionTime + 1}`, seconds: '00' };
      } else {
        return { ...state, sessionTime: state.sessionTime + 1, sessionMinutes: `${state.sessionTime + 1}`, minutesInDisplay: `${state.sessionTime + 1}`, seconds: '00' };
      }

    case ACTIONS.INCREMENT_BREAK: if (state.breakTime === 60) return state;
      if (state.breakTime < 9) {
        return { ...state, breakTime: state.breakTime + 1, breakMinutes: `0${state.breakTime + 1}`, seconds: '00' };
      } else {
        return { ...state, breakTime: state.breakTime + 1, breakMinutes: `${state.breakTime + 1}`, seconds: '00' };
      }

    case ACTIONS.DECREMENT_SESSION: if (state.sessionTime === 1) return state;
      if (state.sessionTime <= 10) {
        return { ...state, sessionTime: state.sessionTime - 1, sessionMinutes: `${state.sessionTime + 1}`, minutesInDisplay: `0${state.sessionTime - 1}`, seconds: '00' };
      } else {
        return { ...state, sessionTime: state.sessionTime - 1, sessionMinutes: `${state.sessionTime + 1}`, minutesInDisplay: `${state.sessionTime - 1}`, seconds: '00' };
      }

    case ACTIONS.DECREMENT_BREAK: if (state.breakTime === 1) return state;

      if (state.breakTime <= 10) {
        return { ...state, breakTime: state.breakTime - 1, breakMinutes: `0${state.breakTime - 1}`, seconds: '00' };
      } else {
        return { ...state, breakTime: state.breakTime - 1, breakMinutes: `${state.breakTime - 1}`, seconds: '00' };
      }

    case ACTIONS.SET_DISPLAY: let inDisplaySeconds;
      let inDisplayMinutes;
      let seconds = payload.seconds % 60;
      let minutes = Math.floor(payload.seconds / 60);
      if (payload.play_stop) {
        if (seconds < 10) {
          inDisplaySeconds = `0${seconds}`;
        } else {
          inDisplaySeconds = seconds;
        }
        if (minutes < 10) {
          inDisplayMinutes = `0${minutes}`;
        } else {
          inDisplayMinutes = minutes;
        }
        return { ...state, minutesInDisplay: inDisplayMinutes, seconds: inDisplaySeconds }
      } else {
        return state;
      }
  }
}



function App() {

  const [{ sessionTime, breakTime, minutesInDisplay, seconds }, dispatch] = useReducer(reducer, { sessionTime: 25, breakTime: 5, minutesInDisplay: '25', seconds: '00', sessionEnded: false, play_stop: false })

  const [play_stop, setPlay_stop] = useState(false);
  const [reset, setReset] = useState(false);
  const [time, setTime] = useState();
  const [sessionEnd, setSessionEnd] = useState(true);
  const [countdown, setCountdown] = useState();
  const [inSeconds, setInSeconds] = useState(0);
  const [intervalId, setIntervalId] = useState();



  useEffect(() => {
    let id;
    let t;
    t = new Date();
    if (inSeconds === 0) {
      if (sessionEnd) {
        t.setSeconds(t.getSeconds() + (breakTime * 60))
      }
      else {
        t.setSeconds(t.getSeconds() + (sessionTime * 60))
      };
    } else {
      t.setSeconds(t.getSeconds() + inSeconds);
    }
    setTime(t.valueOf());

    if (time)
      id = setInterval(() => {
        setCountdown(new Date().valueOf())
      }, 100)
    setIntervalId(id);


    return () => {
      clearInterval(id);
    }
  }, [reset, play_stop, time, sessionEnd]);

  useEffect(() => {
    if (play_stop) {
      if (time && countdown) {
        const timeInSeconds = Math.floor((time - countdown) / 1000);
        if (inSeconds !== timeInSeconds) {
          setInSeconds(timeInSeconds);
        }
      }
    } else { clearInterval(intervalId) };
  }, [countdown]);

  useEffect(() => {
    console.log(Math.round(inSeconds))
    console.log(inSeconds % 60)
    dispatch({ type: ACTIONS.SET_DISPLAY, payload: { seconds: inSeconds, play_stop: play_stop } })
    if (inSeconds <= 0) {
      clearInterval(intervalId);
      if (sessionEnd) {
        setTimeout(() => {
          setSessionEnd(false)
        }, 1000);
      } else {
        setTimeout(() => {
          setSessionEnd(true)
        }, 1000);
      }
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
          <div id='start-stop' onClick={() => { setPlay_stop(!play_stop); }}>start-stop</div>
          <div id='reset' onClick={() => { setReset(!reset) }}>reset</div>
        </div>
      </div>
    </div>
  );
}

export default App;
