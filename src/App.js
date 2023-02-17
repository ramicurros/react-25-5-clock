import { useState, useReducer } from 'react'
import './App.css';
import TimerSettings from './components/timerSettings';
import TimeDisplay from './components/timeDisplay';

export const ACTIONS = {
  INCREMENT_SESSION: 'increment_session',
  INCREMENT_BREAK: 'increment_break',
  DECREMENT_SESSION: 'decrement_session',
  DECREMENT_BREAK: 'decrement_break',
  SET_MINUTES: 'set_minutes',
  START_COUNTDOWN: 'start_countdown',
  SET_COUNTDOWN: 'set_countdown',
  SET_PLAY_STOP: 'set_play_stop'
}


function reducer(state, { type, payload }) {

  let intervalId;

  switch (type) {
    case ACTIONS.INCREMENT_SESSION: if (state.sessionTime === 60) return state;

      return { ...state, sessionTime: state.sessionTime + 1, sessionMinutes: `${state.sessionTime + 1}`, minutesInDisplay: `${state.sessionTime + 1}`, seconds: '00' };

    case ACTIONS.INCREMENT_BREAK: if (state.breakTime === 60) return state;

      return { ...state, breakTime: state.breakTime + 1, breakMinutes: `${state.breakTime + 1}`, minutesInDisplay: `${state.sessionTime}`, seconds: '00' };

    case ACTIONS.DECREMENT_SESSION: if (state.sessionTime === 1) return state;

      return { ...state, sessionTime: state.sessionTime - 1, sessionMinutes: `${state.sessionTime - 1}`, minutesInDisplay: `${state.sessionTime - 1}`, seconds: '00' };

    case ACTIONS.DECREMENT_BREAK: if (state.breakTime === 1) return state;

      return { ...state, breakTime: state.breakTime - 1, breakMinutes: `${state.breakTime - 1}`, minutesInDisplay: `${state.sessionTime}`, seconds: '00' };

    case ACTIONS.START_COUNTDOWN: if (state.play_stop) {
      return intervalId = setInterval(secondLess(state.seconds, state.minutesInDisplay), 1000);
    }
    return state;

    case ACTIONS.SET_COUNTDOWN: if (parseFloat(state.sessionMinutes) < 0) return { ...state, sessionMinutes: `${state.sessionTime}`, minutesInDisplay: state.breakMinutes };

      if (parseFloat(state.breakMinutes) < 0) return { ...state, breakMinutes: `${state.breakTime}`, minutesInDisplay: state.sessionMinutes };

    case ACTIONS.SET_PLAY_STOP: if (state.play_stop) {clearInterval(intervalId); return { ...state, play_stop: false }}

      return { ...state, play_stop: true };
  }
}

function minuteLess(minutes) {
  if (parseFloat(minutes) >= 10) return minutes = `${minutes - 1}`;
  if (parseFloat(minutes) < 10) return minutes = `0${minutes - 1}`;
}

function secondLess(seconds, minutes) {
  if (parseFloat(seconds) >= 10) return seconds = `${seconds - 1}`
  if (parseFloat(seconds) < 10 && parseFloat(seconds) >= 1) return seconds = `0${seconds - 1}`
  if (parseFloat(seconds) <= 0) {
    seconds = '59';
    minuteLess(minutes);
  }
}

function App() {

  const [{ sessionTime, breakTime, minutesInDisplay, seconds, play_stop}, dispatch] = useReducer(reducer, {sessionTime: 25, breakTime: 5, minutesInDisplay: '25', seconds: '00', play_stop: false})

  function countDownFunction(action1, action2, action3){
      dispatch({type: action1});
      dispatch({type: action2});
      dispatch({type: action3});
  }

  return (
    <div id='App' className='d-flex flex-column justify-content-center align-content-center app'>
      <div id='clock' className='d-flex flex-column justify-content-center align-content-center clock'>
        <div id='timer-settings' className='d-flex timer-settings'>
          <TimerSettings dispatch={dispatch} sessionTime={sessionTime} breakTime={breakTime}/>
        </div>
        <div id='time-display'>
          <TimeDisplay minutesInDisplay={minutesInDisplay} secondsInDisplay={seconds}/>
        </div>
        <div id='buttons'>
          <div id='start-stop' onClick={() => countDownFunction(ACTIONS.SET_PLAY_STOP, ACTIONS.SET_COUNTDOWN, ACTIONS.START_COUNTDOWN)}>start-stop</div>
          <div id='reset'>reset</div>
        </div>
      </div>
    </div>
  );
}

export default App;
