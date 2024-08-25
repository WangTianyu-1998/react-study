import { animated, useSpringValue } from "@react-spring/web";
import React, { FC, useEffect } from "react";
const App: FC = () => {
  /**
   * 1000毫秒完成 长度为1000的动画
   */
  const width = useSpringValue(0, {
    config: {
      // duration: 1000, // 动画持续时间
      mass: 2, // 质量(也就是重量),质量越大,弹簧惯性越大,回弹的距离和次数越多
      friction: 10, // 摩擦力,增加点阻力可以抵消质量和张力的效果
      tension: 600, // 张力,弹簧松紧程度,弹簧越紧,回弹速度越快
    },
  });
  useEffect(() => {
    width.start(500);
  }, [width]);
  return <animated.div className="box" style={{ width }}></animated.div>;
};
export default App;
