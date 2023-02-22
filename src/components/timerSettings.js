import { ACTIONS } from "../App";

function TimerSettings({ dispatch, sessionTime, breakTime, play_stop }) {

    return (
        <>
            <div id='break' className="d-flex flex-column align-items-center justify-content-center break">
                <div id='break-label' className="settings-label brightColor">Break Length</div>
                <div id='break-increment' className="d-flex justify-content-center align-items-center increment settings-btn" onClick={() => dispatch({type: ACTIONS.INCREMENT_BREAK, payload: {play_stop: play_stop}})}>+</div>
                <div className="d-flex justify-content-center align-items-center settings-display brightColor">{breakTime}</div>
                <div id='break-decrement' className='d-flex justify-content-center align-items-center decrement settings-btn' onClick={() => dispatch({type: ACTIONS.DECREMENT_BREAK, payload: {play_stop: play_stop}})}>-</div>
            </div>
            <div id='session' className="d-flex flex-column align-items-center justify-content-center session">
                <div id='session-label' className="settings-label brightColor">Session Length</div>
                <div id='session-increment' className="d-flex justify-content-center align-items-center increment settings-btn" onClick={() => dispatch({type: ACTIONS.INCREMENT_SESSION, payload: {play_stop: play_stop}})}>+</div>
                <div className="d-flex justify-content-center align-items-center settings-display brightColor">{sessionTime}</div>
                <div id='session-decrement' className='d-flex justify-content-center align-items-center decrement settings-btn' onClick={() => dispatch({type: ACTIONS.DECREMENT_SESSION, payload: {play_stop: play_stop}})}>-</div>
            </div>
        </>
    );
}

export default TimerSettings;