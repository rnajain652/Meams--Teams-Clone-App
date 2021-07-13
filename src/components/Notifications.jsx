import React, { useContext } from 'react';
import { Button, Typography } from '@material-ui/core';
import { SocketContext } from '../SocketContext';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import { red, green } from '@material-ui/core/colors';

const callTheme = createTheme({ palette: { primary: green, secondary: red } })

const Notifications = () => {
    const { answerCall, call, callAccepted, leaveCall } = useContext(SocketContext);
    return (
        <>
            {call.isReceivingCall && !callAccepted && (
                <ThemeProvider theme={callTheme}>
                    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                        <h2>{call.name || 'Unknown User'} is calling: </h2>
                        <Button variant="contained" color="primary" onClick={answerCall}>
                            Answer
                        </Button>
                        <Button variant="contained" color="secondary" onClick={leaveCall}>
                            Decline
                        </Button>
                    </div>
                </ThemeProvider>
            )
            }
        </>
    )
}

export default Notifications;