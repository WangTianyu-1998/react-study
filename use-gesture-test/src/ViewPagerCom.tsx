import { animated, useSprings } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import React, { FC, useRef } from "react";

const pages = [
  "https://images.pexels.com/photos/62689/pexels-photo-62689.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  "https://images.pexels.com/photos/733853/pexels-photo-733853.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  "https://images.pexels.com/photos/4016596/pexels-photo-4016596.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  "https://images.pexels.com/photos/351265/pexels-photo-351265.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  "https://images.pexels.com/photos/924675/pexels-photo-924675.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
];

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
      console.log("🚀 ~ xDir:", xDir);
      // 当正在拖动并且拖动的距离超过了宽度的一半，就改变 index。
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
  return (
    <div className="wrapper">
      {props.map(({ x, scale }, i) => (
        <animated.div className="page" {...bind()} key={i} style={{ x }}>
          <animated.div
            style={{ scale, backgroundImage: `url(${pages[i]})` }}
          />
        </animated.div>
      ))}
    </div>
  );
};
export default ViewPager;
