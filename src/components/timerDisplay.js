import { useState, useEffect } from 'react'


function TimerDisplay({ minutesInDisplay, secondsInDisplay }) {


    return (
        <>
            <div id='time-left'>{minutesInDisplay}:{secondsInDisplay}</div>
            <div id='timer-label'>Session</div>
        </>
    );
}

export default TimerDisplay;