import React, { useState, useEffect } from "react";
import VolumeOffIcon from "@material-ui/icons/VolumeOff";
import VolumeUpIcon from "@material-ui/icons/VolumeUp";
import { IconButton } from "@material-ui/core";

import { useStyles } from "../Header/Style";

const useAudio = (audioProp) => {
  const [audio, setAudio] = useState(new Audio(audioProp));
  const [playing, setPlaying] = useState(false);

  const toggle = () => setPlaying(!playing);

  useEffect(() => {
    return playing ? audio.play() : audio.pause();
  }, [playing]);

  useEffect(() => {
    setAudio(new Audio(audioProp));
  }, [audioProp]);

  useEffect(() => {
    audio.addEventListener("ended", () => {
      setTimeout(() => {
        setPlaying(false);
      }, 2000);
    });

    return () => {
      audio.removeEventListener("ended", () => {
        setPlaying(false);
        toggle();
      });
    };
  }, [playing]);

  return [playing, toggle];
};

const Player = ({ audioProp }) => {
  const [playing, toggle] = useAudio(audioProp);
  const classes = useStyles();

  return (
    <div>
      <IconButton
        edge='start'
        className={classes.menuButton}
        color='inherit'
        aria-label='open drawer'
        onClick={toggle}
      >
        {!playing ? <VolumeOffIcon /> : <VolumeUpIcon />}
      </IconButton>
    </div>
  );
};

export default Player;
