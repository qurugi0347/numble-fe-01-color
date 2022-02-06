import React, { useState, useEffect, useMemo } from "react";
import styled from "styled-components";

import ScoreSection from "@/components/ScoreSection";
import ColorButton from "@/components/ColorButton";

interface EmptyProps {}
interface GamePannelProps {
  rowCount: string | number;
  children?: JSX.Element | String;
}

const Home: React.FC<EmptyProps> = (EmptyProps) => {
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(15);
  const [stage, setStage] = useState(1);

  const rowCount: number = useMemo(() => {
    return Math.round((stage + 0.5) / 2) + 1;
  }, [stage]);

  useEffect(() => {
    setScore((prevScore) => prevScore + Math.pow(stage, 3) * time);
    setTime(15);
    const intervalId = setInterval(() => {
      setTime((prevTime) => prevTime - 1);
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, [stage]);

  useEffect(() => {
    if (time === 0) {
      alert("GAME OVER");
      setStage(1);
      setTime(15);
    }
  }, [time]);

  const clickPannel = (correct: boolean) => {
    if (correct) {
      setStage((nowStage) => nowStage + 1);
    } else {
      setTime((prevTime) => prevTime - 3);
    }
  };

  const renderedColorButton: JSX.Element = useMemo(() => {
    const buttons = [];
    const renderCount = Math.pow(rowCount, 2);
    const answerIndex = Math.floor(Math.random() * rowCount);
    const hue = Math.floor(Math.random() * 360);
    for (let i = 0; i < renderCount; i++) {
      buttons.push(
        <ColorButton
          key={i}
          hue={hue}
          saturation={1}
          brightness={1}
          isMutant={i === answerIndex}
          colorDiffValue={Math.max(40 - stage * 2, 1)}
          onClick={() => {
            clickPannel(i === answerIndex);
          }}
        />
      );
    }
    return <>{buttons.map((buttonElement) => buttonElement)}</>;
  }, [stage]);

  return (
    <div>
      <ScoreSection score={score} time={time} stage={stage} />
      <GamePannelHolder rowCount={rowCount}>
        {renderedColorButton}
      </GamePannelHolder>
    </div>
  );
};

export default Home;

const GamePannelHolder = styled.div<GamePannelProps>`
  max-width: 500px;
  display: grid;
  grid-template-columns: repeat(${(props) => props.rowCount}, 1fr);
  grid-gap: 8px;
`;
