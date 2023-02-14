function TimerSettings({breakState, sessionState, setBreak, setSession}) {

    function increment(state, setState){
        if(state < 60) setState(state + 1);
        return state
    }

    function decrement(state, setState){
        if(state > 0)setState(state - 1);
        return state;
    }

    return (
        <>
            <div id='break'>
                <div id='break-label'>Break Length</div>
                <div id='break-increment' onClick={() => {increment(breakState, setBreak)}}>+</div>
                <div>{breakState}</div>
                <div id='break-decrement' onClick={() => {decrement(breakState, setBreak)}}>-</div>
            </div>
            <div id='session    '>
                <div id='session-label'>Session Length</div>
                <div id='session-increment' onClick={() => {increment(sessionState, setSession)}}>+</div>
                <div>{sessionState}</div>
                <div id='session-decrement' onClick={() => {decrement(sessionState, setSession)}}>-</div>
            </div>
        </>
    );
}

export default TimerSettings;