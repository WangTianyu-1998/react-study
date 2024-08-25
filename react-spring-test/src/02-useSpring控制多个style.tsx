import { animated, useSpring } from "@react-spring/web";
import { FC } from "react";
const App: FC = () => {
  /**
   * 如果有多个style都要变化,就需要使用useSpring
   */
  const styles = useSpring({
    from: { width: 0, height: 0 },
    to: { width: 200, height: 200 },
    config: {
      // duration: 2000
      mass: 2,
      friction: 10,
      tension: 400,
    },
  });
  return <animated.div className="box" style={{ ...styles }}></animated.div>;
};
export default App;
