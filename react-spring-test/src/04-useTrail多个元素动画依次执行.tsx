import { useTrail, animated } from "@react-spring/web";
import { FC } from "react";
const App: FC = () => {
  /**
   * 多个元素的动画依次进行
   */
  const [springs] = useTrail(
    3,
    () => ({
      from: { width: 0 },
      to: { width: 300 },
      config: { duration: 1000 },
    }),
    []
  );

  return (
    <div>
      {springs.map((styles) => (
        <animated.div style={{ ...styles }} className="box"></animated.div>
      ))}
    </div>
  );
};
export default App;
