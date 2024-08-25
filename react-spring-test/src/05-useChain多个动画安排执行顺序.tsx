import {
  animated,
  useChain,
  useSpringRef,
  useSprings,
  useTrail,
} from "@react-spring/web";
import "./App.css";

export default function App() {
  // useSpringRef 用于创建动画引用
  const api1 = useSpringRef();

  const [springs] = useTrail(
    3,
    () => ({
      ref: api1,
      from: { width: 0 },
      to: { width: 300 },
      config: {
        duration: 1000,
      },
    }),
    []
  );

  const api2 = useSpringRef();

  const [springs2] = useSprings(
    3,
    () => ({
      ref: api2,
      from: { height: 100 },
      to: { height: 50 },
      config: {
        duration: 1000,
      },
    }),
    []
  );

  /**
   * 第一个参数是动画的引用，第二个参数是动画的执行顺序，第三个参数是延迟时间
   */
  useChain([api1, api2], [0, 1], 500);

  return (
    <div>
      {springs.map((styles1, index) => (
        <animated.div
          style={{ ...styles1, ...springs2[index] }}
          className="box"
        ></animated.div>
      ))}
    </div>
  );
}
