import { useEffect, useState } from "react";

interface Props {
  date: string;
}

const Countdown = ({ date }: Props) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    months: 0,
    years: 0,
    hours:0,
    minute:0
  });

  useEffect(() => {
  if (!date) return;

  const target = new Date(date);

  const updateCountdown = () => {
    const now = new Date();

    const diff =
      target.getTime() - now.getTime();

    if (diff <= 0) {
      setTimeLeft({
        years: 0,
        months: 0,
        days: 0,
        hours: 0,
        minute: 0
      });

      return;
    }

    const totalDays = Math.floor(
      diff / (1000 * 60 * 60 * 24)
    );


    setTimeLeft({
      years: Math.floor(totalDays / 365),
      months: Math.floor(
        (totalDays % 365) / 30
      ),
      days: Math.floor(
        (totalDays % 365) % 30
      ),
      hours: Math.floor(
        (diff / (1000 * 60 * 60)) % 24
      ),
      minute: Math.floor(
        (diff / (1000 * 60)) % 60
      ),

    
    });
  };

  updateCountdown();

  const interval = setInterval(
    updateCountdown,
    1000
  );

  return () => clearInterval(interval);
}, [date]);

  return (
    <div className="flex justify-center gap-1 ">

      <div className="count-box">
        <p className="text-lg">{timeLeft.months}</p>
        <p>Mounth</p>
      </div>

      <div className="count-box">
        <p className="text-lg">{timeLeft.days}</p>
        <p>Day</p>
      </div>

      <div className="count-box">
        <p className="text-lg">{timeLeft.hours}</p>
        <p>Hours</p>
      </div>

      <div className="count-box">
        <p className="text-lg">{timeLeft.minute}</p>
        <p>Minute</p>
      </div>
    </div>
  );
};

export default Countdown;