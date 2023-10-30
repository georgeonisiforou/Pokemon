import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import WaveSurfer from "wavesurfer.js";
import {
  BsPlayCircleFill,
  BsPauseCircleFill,
  BsRepeat1,
  BsShuffle,
  BsHeart,
} from "react-icons/bs";
import { FaBackwardStep, FaForwardStep } from "react-icons/fa6";
import Image from "next/image";
import axios from "axios";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 2rem;
  padding: 2rem;
`;

const WaveForm = styled.div`
  width: 100%;
`;

const PlayBtn = styled.button`
  border: none;
  z-index: 1;
  width: 60px;
  height: 60px;
  overflow: hidden;
  border-radius: 50%;
  background-color: transparent;
  position: relative;
  display: flex;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    box-shadow: 0px 0px 10px 2px rgba(255, 255, 255, 0.5);
  }
`;

const BackAndForwardBtn = styled.button`
  border: none;
  width: 40px;
  height: 40px;
  overflow: hidden;
  border-radius: 50%;
  background-color: transparent;
  display: flex;
  padding: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const MediaInput = styled.input`
  width: 500px;
  height: 50px;
  border: 1px solid white;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px;
  border-radius: 8px;
`;

const MediaCardContainer = styled.div`
  width: 900px;
  height: 400px;
  border-radius: 12px;
  background: linear-gradient(
    145deg,
    rgba(224, 74, 56, 1) 8%,
    rgba(244, 154, 94, 1) 43%
  );
  display: flex;
  padding: 32px;
`;

const MediaCard = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 15px;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.6);
  padding: 24px;
`;

const CardImage = styled.div`
  position: relative;
  width: 300px;
  height: 100%;
  border-radius: 12px;
  box-shadow: 0px 0px 25px 2px rgba(0, 0, 0, 0.3);
  overflow: hidden;
`;

const CardContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0.5rem;
`;

const SongTitle = styled.h3`
  font-size: 1.5rem;
  color: rgb(151, 106, 85);
  display: flex;
  justify-content: space-between;
`;

const MediaControls = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const DurationContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SearchField = styled.input`
  width: 400px;
  height: 50px;
  padding: 1rem;
  font-size: 1rem;
  border-radius: 10px;
  border: none;
`;

const SearchBtn = styled.button`
  width: 150px;
  height: 50px;
  font-size: 1rem;
  border-radius: 50px;
  border: none;
  cursor: pointer;
`;

const SearchContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

const Waveform = () => {
  const [playerHasLoaded, setPlayerHasLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [media, setMedia] = useState(null);
  const [fileHasLoaded, setFileHasLoaded] = useState(false);
  const [fileName, setFileName] = useState("");
  const [duration, setDuration] = useState({ minutes: "", seconds: "" });
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [search, setSearch] = useState(null);
  const [searchData, setSearchData] = useState(null);

  const inputRef = useRef();
  const wavekreper = useRef();

  function secondsToTime(secs) {
    let hours = Math.floor(secs / (60 * 60));

    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);

    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);

    if (seconds === 60) {
      seconds = 0;
      minutes = minutes + 1;
    }

    let obj = {
      h: hours,
      m: minutes,
      s: seconds,
    };
    return obj;
  }

  const readFile = (file) => {
    let name = file.name.split(".")[0];
    setFileName(name);

    setFileHasLoaded(false);
    let fileReader = new FileReader();

    fileReader.onload = () => {
      let audioBlob = new Blob([new Uint8Array(fileReader.result)], {
        type: "audio/mpeg",
      });

      let audioUrl = URL.createObjectURL(audioBlob);

      setMedia(audioUrl);
      setFileHasLoaded(true);
    };
    fileReader.readAsArrayBuffer(file);
  };

  const createWaveformInstance = () => {
    if (playerHasLoaded === true) {
      wavekreper.current.destroy();
      setIsPlaying(false);
      setMinutes(0);
      setSeconds(0);
    }

    wavekreper.current = WaveSurfer.create({
      container: "#waveform",
      waveColor: "rgb(151,106,85)",
      progressColor: "rgb(255,255,255)",
      url: media,
    });

    wavekreper.current.on("ready", () => {
      setPlayerHasLoaded(true);
      let trackDuration = wavekreper.current.getDuration() + 1;

      setDuration({
        minutes: `${Math.round(trackDuration / 60)}`,
        seconds:
          Math.round(trackDuration) % 60 < 10
            ? `0${Math.round(trackDuration) % 60}`
            : Math.round(trackDuration) % 60,
      });
    });

    wavekreper.current.on("audioprocess", () => {
      let currentTime = wavekreper.current.getCurrentTime();

      setSeconds(secondsToTime(currentTime).s);
      setMinutes(secondsToTime(currentTime).m);
    });

    wavekreper.current.on("interaction", () => {
      wavekreper.current.isPlaying();
    });

    wavekreper.current.on("finish", () => {
      setIsPlaying(false);
    });
  };

  useEffect(() => {
    if (fileHasLoaded) {
      createWaveformInstance();
    }
  }, [fileHasLoaded]);

  return (
    <>
      <Container>
        <MediaInput
          type="file"
          ref={inputRef}
          onChange={(e) => {
            readFile(inputRef.current.files[0]);
          }}
        />
        {fileHasLoaded && (
          <MediaCardContainer>
            <MediaCard>
              <CardImage>
                <Image alt="dgdgg" src="/images/ledzeppelin.jpg" fill />
              </CardImage>
              <CardContent>
                <SongTitle>
                  {fileName}{" "}
                  <BackAndForwardBtn>
                    <BsHeart
                      style={{ color: "white", width: "100%", height: "100%" }}
                    />
                  </BackAndForwardBtn>
                </SongTitle>
                <WaveForm id="waveform"></WaveForm>
                <DurationContainer>
                  <span>{`${minutes}:${
                    seconds < 10 ? `0${seconds}` : seconds
                  }`}</span>
                  <span>{`${duration.minutes}:${duration.seconds}`}</span>
                </DurationContainer>
                {playerHasLoaded && (
                  <MediaControls>
                    <BackAndForwardBtn>
                      <BsRepeat1
                        style={{
                          width: "100%",
                          height: "100%",
                        }}
                      />
                    </BackAndForwardBtn>
                    <BackAndForwardBtn>
                      <FaBackwardStep
                        style={{
                          width: "100%",
                          height: "100%",
                        }}
                      />
                    </BackAndForwardBtn>
                    <PlayBtn
                      onClick={() => {
                        if (wavekreper.current.isPlaying()) {
                          wavekreper.current.pause();
                          setIsPlaying(false);
                        } else {
                          wavekreper.current.play();
                          setIsPlaying(true);
                        }
                      }}
                    >
                      {playerHasLoaded && (
                        <>
                          {isPlaying ? (
                            <BsPauseCircleFill
                              style={{
                                width: "100%",
                                height: "100%",
                              }}
                            />
                          ) : (
                            <BsPlayCircleFill
                              style={{
                                width: "100%",
                                height: "100%",
                              }}
                            />
                          )}
                        </>
                      )}
                    </PlayBtn>
                    <BackAndForwardBtn>
                      <FaForwardStep
                        style={{
                          width: "100%",
                          height: "100%",
                        }}
                      />
                    </BackAndForwardBtn>
                    <BackAndForwardBtn>
                      <BsShuffle
                        style={{
                          width: "100%",
                          height: "100%",
                        }}
                      />
                    </BackAndForwardBtn>
                  </MediaControls>
                )}
              </CardContent>
            </MediaCard>
          </MediaCardContainer>
        )}
      </Container>
    </>
  );
};

export default Waveform;
