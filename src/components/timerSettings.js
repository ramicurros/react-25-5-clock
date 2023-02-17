import { ACTIONS } from "../App";

function TimerSettings({ dispatch, sessionTime, breakTime }) {

    return (
        <>
            <div id='break'>
                <div id='break-label'>Break Length</div>
                <div id='break-increment' onClick={() => dispatch({type: ACTIONS.INCREMENT_BREAK})}>+</div>
                <div>{breakTime}</div>
                <div id='break-decrement' onClick={() => dispatch({type: ACTIONS.DECREMENT_BREAK})}>-</div>
            </div>
            <div id='session'>
                <div id='session-label'>Session Length</div>
                <div id='session-increment' onClick={() => dispatch({type: ACTIONS.INCREMENT_SESSION})}>+</div>
                <div>{sessionTime}</div>
                <div id='session-decrement' onClick={() => dispatch({type: ACTIONS.DECREMENT_SESSION})}>-</div>
            </div>
        </>
    );
}

export default TimerSettings;