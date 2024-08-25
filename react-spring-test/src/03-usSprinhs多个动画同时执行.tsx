import { animated, useSpring, useSprings } from "@react-spring/web";
import { FC, useEffect } from "react";
const App: FC = () => {
  /**
   * 多个元素都要同时做动画
   * 如果指定了to, 俺就立即执行动画,或者不指定to, 用 api.start来开始动画
   */
  const [springs, api] = useSprings(3, () => ({
    from: { width: 0 },
    // to: { width: 200 },
    config: {
      duration: 1000,
    },
  }));
  useEffect(() => {
    api.start({ width: 200 });
  }, [api]);
  return (
    <div>
      {springs.map((styles) => (
        <animated.div
          className="box"
          style={{ ...styles, background: "pink", height: 100, margin: 10 }}
        ></animated.div>
      ))}
    </div>
  );
};
export default App;
