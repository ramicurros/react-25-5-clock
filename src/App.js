import './App.css';
import TimerSettings from './components/timerSettings';
import TimeDisplay from './components/timeDisplay';
import Buttons from './components/buttons';

function App() {
  return (
    <div id='App' className='d-flex  app'>
      <div id='clock'>
        <div id='timer-settings'>
          <TimerSettings />
        </div>
        <div id='time-display'>
          <TimeDisplay />
        </div>
        <div id='buttons'>
          <Buttons />
        </div>
      </div>
    </div>
  );
}

export default App;
