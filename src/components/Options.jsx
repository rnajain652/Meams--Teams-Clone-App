import React, { useContext, useState } from 'react';
import { Button, TextField, Grid, Typography, Container, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Assignment, Phone, PhoneDisabled, WhatsApp } from '@material-ui/icons';
import { SocketContext } from '../SocketContext';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import { red, green, yellow } from '@material-ui/core/colors';
import { WhatsappShareButton } from 'react-share';

const callTheme = createTheme({ palette: { secondary: green, primary: red, default: yellow } })

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
    },
    gridContainer: {
        width: '100%',
        [theme.breakpoints.down('xs')]: {
            flexDirection: 'column',
        },
    },
    container: {
        width: '600px',
        margin: '35px 0',
        padding: 0,
        width: '30%',
        [theme.breakpoints.down('xs')]: {
            width: '80%',
        },
    },
    margin: {
        marginTop: 20,
    },
    padding: {
        padding: 20,
    },
    paper: {
        position: 'absolute',
        top: '0px',
        left: '100px',
    },
    paper: {
        padding: '10px 20px',
        border: '2px solid black',
    },
}));

const Options = ({ children }) => {
    const { me, callAccepted, name, setName, callEnded, leaveCall, callUser } = useContext(SocketContext);
    const [idToCall, setIdToCall] = useState('');
    const classes = useStyles();

    return (
        <ThemeProvider theme={callTheme}>
            <Container className={classes.container}>
                <Paper elevation={10} className={classes.paper}>
                    {children}
                    <form className={classes.root} noValidate autoComplete="off">
                        <Grid container className={classes.gridContainer} >
                            <Grid item xs={12} md={6} className={classes.padding}>
                                <Typography gutterBottom variant="h6">Account Info</Typography>
                                <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} fullWidth />
                                <CopyToClipboard text={me} className={classes.margin}>
                                    <Button variant="contained" color="default" fullWidth startIcon={<Assignment fontSize="large" />}>
                                        ID
                                    </Button>
                                </CopyToClipboard>
                                <Typography mt>Share with:
                                    <WhatsappShareButton url={'https://meams-video-calling-app.netlify.app'} title={'Id to join: ' + me + '\n at: '}>
                                        <WhatsApp />
                                    </WhatsappShareButton>
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={6} className={classes.padding}>
                                <Typography gutterBottom variant="h6">Make a Call</Typography>
                                <TextField label="ID to Call" value={idToCall} onChange={(e) => setIdToCall(e.target.value)} fullWidth />
                                {callAccepted && !callEnded ? (
                                    <Button variant="contained" color="primary" startIcon={<PhoneDisabled fontSize="large" />} fullWidth onClick={leaveCall} className={classes.margin}>
                                        Hang Up
                                    </Button>
                                ) : (
                                    <Button variant="contained" color="secondary" startIcon={<Phone fontSize="large" />} fullWidth onClick={() => callUser(idToCall)} className={classes.margin} >
                                        Make a Call
                                    </Button>
                                )}
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </Container >
        </ThemeProvider >
    )
}

export default Options;