import React, { useState, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import { connect } from "react-redux";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import MicIcon from "@material-ui/icons/Mic";
import MicOffIcon from "@material-ui/icons/MicOff";

import { useStyles } from "./Style";
import { fetchInfo } from "../../Redux/actionTypes";
import { Button } from "@material-ui/core";
import SimplePopover from "./PopOver";
import DirectionSnackbar from "./PopOver";

function Header({ fetchInfo }) {
  const classes = useStyles();
  const [word, setWord] = useState("");
  const [transcripts, setTranscripts] = useState("");

  const handleSubmit = (event) => {
    if (word) {
      event.preventDefault();
      fetchInfo(word);
    } else {
      fetchInfo(transcript);
    }
    setWord("");
    resetTranscript("");
  };

  let {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  useEffect(
    (event) => {
      if (transcript !== "" || listening === "off") {
        setTimeout(() => {
          return handleSubmit();
        }, 1000);
      }
    },
    [transcript, listening]
  );

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Toolbar>
          <IconButton
            edge='start'
            className={classes.menuButton}
            color='inherit'
            aria-label='open drawer'
            onClick={
              transcript === ""
                ? SpeechRecognition.startListening
                : SpeechRecognition.stopListening
            }
          >
            {listening ? <MicIcon /> : <MicOffIcon />}
          </IconButton>
          {/* <button onClick={resetTranscript}>Reset</button> */}
          <Typography className={classes.title} variant='h6' noWrap>
            Saif Dictionary
          </Typography>
          <DirectionSnackbar listening={listening} />
          <form onSubmit={handleSubmit} className={classes.searchContainer}>
            <div className={classes.search}>
              {transcript ? (
                <InputBase
                  placeholder='Search…'
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  name='transcript'
                  inputProps={{ "aria-label": "search" }}
                  value={transcript}
                  onChange={(event) => setTranscripts(event.target.value)}
                  autoCorrect='true'
                />
              ) : (
                <InputBase
                  placeholder='Search…'
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  name='transcript'
                  inputProps={{ "aria-label": "search" }}
                  value={word}
                  onChange={(event) => setWord(event.target.value)}
                  autoCorrect='true'
                />
              )}
            </div>

            {word ? (
              <Button
                disabled={word === "" ? true : false}
                type='submit'
                variant='contained'
                color='secondary'
                className={classes.btns}
              >
                Search
              </Button>
            ) : (
              <Button
                disabled={transcript === "" ? true : false}
                type='submit'
                variant='contained'
                color='secondary'
                className={classes.btns}
              >
                Search
              </Button>
            )}
          </form>
        </Toolbar>
      </AppBar>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchInfo: (word) => dispatch(fetchInfo(word)),
  };
};

export default connect(null, mapDispatchToProps)(Header);
