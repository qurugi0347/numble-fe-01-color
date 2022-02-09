import React, { useState, useEffect } from "react";

import useInterval from "@/hooks/useInterval";

const useTimer = (defaultTime: number) => {
  const [time, setTime] = useState(defaultTime);

  const resetTimer = (resetTime: number) => {
    setTime(resetTime);
  };

  const addTime = (addValue: number) => {
    setTime((prevTime) => prevTime + addValue);
  };

  useInterval({
    intervalFunction: () => {
      setTime((prevTime: number) => prevTime - 1);
    },
    delay: 1000,
  });

  return { time, resetTimer, addTime };
};

export default useTimer;
