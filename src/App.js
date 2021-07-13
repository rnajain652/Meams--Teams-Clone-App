import React, { useContext } from 'react';
import { Typography, AppBar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import VideoPlayer from './components/VideoPlayer';
import Options from './components/Options';
import Notifications from './components/Notifications';

import { SocketContext } from './SocketContext';

const useStyles = makeStyles((theme) => ({
  appBar: {
    background: '#6c74cc',
    borderRadius: 0,
    margin: '0px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    border: '2px solid black',
  },
  image: {
    marginLeft: '15px',
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
}));

const App = () => {
  const classes = useStyles();
  const { name, call } = useContext(SocketContext);
  return (
    <div className={classes.wrapper}>
      <AppBar className={classes.appBar} position="static" color="inherit">
        <Typography variant="h4" align="center">Video Chat of {name || 'User'} with {call.name || 'User'}</Typography>
      </AppBar>
      <VideoPlayer />
      <Options>
      <Notifications />
      </Options>
    </div>
  );
}

export default App;