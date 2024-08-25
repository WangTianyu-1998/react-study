import { animated, useSprings } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import dayjs from "dayjs";
import React, { FC, useEffect, useRef, useState } from "react";
import "./App5.css";
//@ts-ignore
import aa from "./wukong.mp4";
//@ts-ignore
import bb from "./456e18d221c71e5ddc4c3f679ac30292_3840_778.mp4";
//@ts-ignore
import cc from "./feature-game-preview.CE3VeZCL.mp4";
const pages = [aa, cc, bb];

/**
 * 一个列表里多个元素根据 index 计算 x，多个元素同时存在
 */
const ViewPager: FC = () => {
  const index = useRef(0);
  const width = window.innerWidth;
  const [props, api] = useSprings(pages.length, (i) => ({
    x: i * width,
    scale: 1,
  }));

  /**
   * movement: 拖动距离[x,y]
   * direction: 拖动方向[x,y] 1代表向左上 -1代表向右下
   * active 是否在拖动
   * cancel 取消拖动
   */
  const bind = useDrag(
    ({ active, movement: [mx], direction: [xDir], cancel }) => {
      if (active && Math.abs(mx) > width / 2) {
        let newIndex = index.current + (xDir > 0 ? -1 : 1);
        if (newIndex < 0) {
          newIndex = 0;
        }
        if (newIndex >= pages.length) {
          newIndex = pages.length - 1;
        }
        index.current = newIndex;
        cancel();
      }
      api.start((i) => {
        const x = (i - index.current) * width + (active ? mx : 0);
        const scale = active ? 1 - Math.abs(mx) / width / 2 : 1;
        return { x, scale };
      });
    }
  );

  const [time, setTime] = useState(dayjs("2024-08-25 17:59:30"));

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
      {props.map(({ x, scale }, i) => (
        <>
          <animated.div
            className="page"
            {...bind()}
            key={i}
            style={{ x, scale }}
          >
            <animated.div>
              <video
                src={pages[i]}
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
              </>
            </animated.div>
          </animated.div>
          <h1 className="time-display" onClick={goFullScreen}>
            {time.format("YYYY-MM-DD HH:mm:ss")}
          </h1>
        </>
      ))}
    </div>
  );
};
export default ViewPager;
