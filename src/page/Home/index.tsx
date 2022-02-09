import React, { useState, useEffect, useMemo } from "react";
import styled from "styled-components";

import ScoreSection from "@/components/ScoreSection";
import ColorButton from "@/components/ColorButton";
import useTimer from "@/hooks/useTimer";

interface EmptyProps {}
interface GamePannelProps {
  rowCount: string | number;
  children?: JSX.Element | String;
}

const Home: React.FC<EmptyProps> = (EmptyProps) => {
  const [score, setScore] = useState<number>(0);
  const { time, resetTimer, addTime } = useTimer(15);
  const [stage, setStage] = useState<number>(1);

  const rowCount: number = useMemo(() => {
    return Math.round((stage + 0.5) / 2) + 1;
  }, [stage]);

  useEffect(() => {
    setScore((prevScore) => prevScore + Math.pow(stage, 3) * time);
    resetTimer(15);
  }, [stage]);

  useEffect(() => {
    if (time <= 0) {
      alert(`GAME OVER!\n스테이지: ${stage}, 점수: ${score}`);
      setStage(1);
      resetTimer(15);
    }
  }, [time]);

  const clickPannel = (correct: boolean) => {
    if (correct) {
      setStage((nowStage) => nowStage + 1);
    } else {
      addTime(-3);
    }
  };

  const renderedColorButton: JSX.Element = useMemo(() => {
    const buttons = [];
    const renderCount = Math.pow(rowCount, 2);
    const answerIndex = Math.floor(Math.random() * renderCount);
    console.log(answerIndex);
    const hue = Math.floor(Math.random() * 360);
    const saturation = Math.max(0.03 * (33 - stage), 0.3);
    const brightness = Math.max(0.03 * (33 - stage), 0.3);
    for (let i = 0; i < renderCount; i++) {
      buttons.push(
        <ColorButton
          key={i}
          hue={hue}
          saturation={saturation}
          brightness={brightness}
          isMutant={i === answerIndex}
          colorDiffValue={Math.max(40 - stage * 2.5, 10)}
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
