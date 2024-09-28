import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import "./App5.css"; // 导入样式文件

const App = () => {
  const [time, setTime] = useState(dayjs(Date.now()));

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prevTime) => prevTime.add(1, "second"));
    }, 1000);

    return () => clearInterval(timer); // 清理定时器
  }, []);

  const goFullScreen = () => {
    const elem = document.documentElement as any;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen();
    }
  };

  return (
    <div className="time-container">
      <video
        src="https://wegame.gtimg.com/g.55555-r.c4663/wukong/assets/pc-header-kv.C_r1cgvm.mp4"
        autoPlay={true}
        loop
        muted
        className="background-video"
      ></video>
      <>
        <img
          className="my-img"
          src="https://wegame.gtimg.com/g.55555-r.c4663/wukong/assets/logo-wukong.Bu4M0jHS.png"
          alt="wuKong"
        />
        <h1 className="time-display" onClick={goFullScreen}>
          {time.format("YYYY-MM-DD HH:mm:ss")}
        </h1>
      </>
    </div>
  );
};

export default App;
