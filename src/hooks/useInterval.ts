import React, { useEffect } from "react";

interface UseIntervalProps {
  intervalFunction: Function;
  delay: number;
}

const useInterval = ({ intervalFunction, delay }: UseIntervalProps) => {
  useEffect(() => {
    if (!delay || delay === 0) return;

    const intervalId = setInterval(() => {
      if (intervalFunction) {
        intervalFunction();
      }
    }, delay);
    return () => {
      clearInterval(intervalId);
    };
  }, [intervalFunction, delay]);
};

export default useInterval;
