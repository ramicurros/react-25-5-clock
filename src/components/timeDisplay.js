import { useState } from 'react'

function TimeDisplay({minutesInDisplay, secondsInDisplay }) {


    return (
        <>
            <div id='time-left'>{minutesInDisplay}:{secondsInDisplay}</div>
            <div id='timer-label'>Session</div>
        </>
    );
}

export default TimeDisplay;