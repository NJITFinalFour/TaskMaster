import { useState, useEffect } from "react";

const Timer = () => {
    const dateNoComma = () => {
        const date = new Date;
        return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`
    }

    const [date, setDate] = useState(dateNoComma());

    const timer = {
      interval: null,
      start: function() {
        this.interval = setInterval(() => {
          setDate(dateNoComma);
        }, 1000);
      },
      stop: function() {
        clearInterval(this.interval);
      }
    };
  
    useEffect(() => {
      timer.start();
      return () => {
        timer.stop();
      };
    }, []);

    return (
        <div>
            {date}
        </div>
    )
};

export default Timer;