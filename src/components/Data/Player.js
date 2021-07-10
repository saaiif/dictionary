import React, { useState, useEffect } from "react";

const useAudio = (audioProp) => {
  const [audio, setAudio] = useState(new Audio(audioProp));
  const [playing, setPlaying] = useState(false);

  const toggle = () => setPlaying(!playing);

  console.log(audio.src, "audio");
  console.log(audioProp, "audioProp");
  console.log(playing, "playing");

  useEffect(() => {
    return playing ? audio.play() : audio.pause();
  }, [playing]);

  useEffect(() => {
    return setAudio(new Audio(audioProp));
  }, [audioProp]);

  useEffect(() => {
    audio.addEventListener("ended", () => {
      setPlaying(false);
      toggle();
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

  return (
    <div>
      <button onClick={toggle}>{playing ? "Pause" : "Play"}</button>
    </div>
  );
};

export default Player;
