import { useState } from 'react'

function TimeDisplay({ breakState, sessionState, playState }) {

    let intervalId
    let intervalId2

    const [minutes, setMinutes] = useState(`${sessionState}`)
    const [seconds, setSeconds] = useState(`00`);
    const [sessionEnd, setSessionEnd] = useState(false);

    function minuteLess() {
        if (parseFloat(minutes) >= 10) setMinutes(`${minutes - 1}`);
        if (parseFloat(minutes) < 10) setMinutes(`0${minutes - 1}`);
    }

    function secondLess() {
        if (parseFloat(seconds) >= 10) setSeconds(`${seconds - 1}`);
        if (parseFloat(seconds) < 10 && parseFloat(seconds) >= 1) setSeconds(`0${seconds - 1}`);
        if (parseFloat(seconds) < 0) setSeconds(`59`);
    }

    if (parseFloat(seconds) === 0 && minutes === 0) {
        setSessionEnd(!sessionEnd);
        if (sessionEnd) {
            setMinutes(`${breakState}`);
            setSeconds(`00`);
        } else {
            setMinutes(`${sessionState}`);
            setSeconds(`00`);
        }
    }

    if(playState){
        intervalId = setInterval(minuteLess, 60000);
        intervalId2 = setInterval(secondLess, 1000);
    }else{
        clearInterval(intervalId);
        clearInterval(intervalId2);
    }

    return (
        <>
            <div id='time-left'>{minutes}:{seconds}</div>
            <div id='timer-label'>Session</div>
        </>
    );
}

export default TimeDisplay;