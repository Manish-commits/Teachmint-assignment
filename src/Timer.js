import React, { useState } from 'react';

const Timer = () => {

    const [time, setTime] = useState(new Date().toLocaleTimeString());

    setInterval(() => {
        setTime(new Date().toLocaleTimeString());
    },1000)
  return (
    <div>
        {time}
    </div>
  )
}

export default Timer