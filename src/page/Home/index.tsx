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
  const [score, setScore] = useState(10);
  const [time, setTime] = useState(1500);
  const [stage, setStage] = useState(1);
  const [answer, setAnswer] = useState(-1);

  const rowCount: number = useMemo(() => {
    return Math.round((stage + 0.5) / 2) + 2;
  }, [stage]);

  const renderedColorButton: JSX.Element = useMemo(() => {
    const buttons = [];
    const renderCount = Math.pow(rowCount, 2);
    const answerIndex = Math.floor(Math.random() * 9);
    for (let i = 0; i < renderCount; i++) {
      buttons.push(
        <ColorButton
          key={i}
          r={255}
          g={0}
          b={0}
          isMutant={i === answerIndex}
          colorDiffValue={100}
        />
      );
    }
    setAnswer(answerIndex);
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
