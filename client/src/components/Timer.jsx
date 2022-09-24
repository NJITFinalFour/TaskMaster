import { useState, useEffect } from "react";
import styled from "styled-components";

const Component = styled.div`
  color: #7aa83d;
  font-size: 18px;
`;

const Timer = () => {
  const dateNoComma = () => {
    const date = new Date();
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  const [date, setDate] = useState(dateNoComma());

  useEffect(() => {
    const timer = {
      interval: null,
      start: function () {
        this.interval = setInterval(() => {
          setDate(dateNoComma);
        }, 1000);
      },
      stop: function () {
        clearInterval(this.interval);
      },
    };
    timer.start();
    return () => {
      timer.stop();
    };
  }, []);

  return <Component>{date}</Component>;
};

export default Timer;
