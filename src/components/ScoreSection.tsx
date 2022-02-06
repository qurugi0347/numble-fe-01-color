import React from "react";

interface ScoreSectionProps {
  score: Number;
  stage: Number;
  time: Number;
}

const ScoreSection: React.FC<ScoreSectionProps> = ({ score, stage, time }) => {
  return (
    <div>
      스테이지 {stage}, 남은 시간: {time}, 점수: {score}
    </div>
  );
};

export default ScoreSection;
