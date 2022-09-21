import { useState, useEffect } from "react";

const Timer = () => {
    const [date, setDate] = useState(new Date().toLocaleString());

    const timer = {
      interval: null,
      start: function() {
        this.interval = setInterval(() => {
          setDate(new Date().toLocaleString());
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