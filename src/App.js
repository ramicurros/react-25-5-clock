import { useState } from 'react'
import './App.css';
import TimerSettings from './components/timerSettings';
import TimeDisplay from './components/timeDisplay';


function App() {

  const [sessionMinutes, setSession] = useState(25);
  const [breakMinutes, setBreak] = useState(5);
  const [onPlay, setPlay] = useState(false);


  return (
    <div id='App' className='d-flex flex-column justify-content-center align-content-center app'>
      <div id='clock' className='d-flex flex-column justify-content-center align-content-center clock'>
        <div id='timer-settings' className='d-flex timer-settings'>
          <TimerSettings sessionState={sessionMinutes} breakState={breakMinutes} setSession={setSession} setBreak={setBreak} />
        </div>
        <div id='time-display'>
          <TimeDisplay sessionState={sessionMinutes} breakState={breakMinutes} playState={onPlay}/>
        </div>
        <div id='buttons'>
          <div id='start-stop' onClick={() => setPlay(!onPlay)}>start-stop</div>
          <div id='reset'>reset</div>
        </div>
      </div>
    </div>
  );
}

export default App;
