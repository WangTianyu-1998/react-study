import { animated, AnimatedProps, useTransition } from "@react-spring/web";
import React, { CSSProperties, FC, useState } from "react";
import "./App.css";

/**
 * 过渡动画
 * 当元素进入 离开的时候(也就是添加到dom和从dom移除的时候)
 */

interface PageItem {
  (props: AnimatedProps<{ style: CSSProperties }>): React.ReactElement;
}

const pages: Array<PageItem> = [
  ({ style }) => (
    <animated.div style={{ ...style, background: "lightpink" }}>A</animated.div>
  ),
  ({ style }) => (
    <animated.div style={{ ...style, background: "lightblue" }}>B</animated.div>
  ),
  ({ style }) => (
    <animated.div style={{ ...style, background: "lightgreen" }}>
      C
    </animated.div>
  ),
];

/**
 * 一个元素的过渡动画
 */
const App: FC = () => {
  const [index, set] = useState(0);
  const onClick = () => set((state) => (state + 1) % 3);
  const transitions = useTransition(index, {
    from: { transform: "translate3d(100%,0,0)" },
    enter: { transform: "translate3d(0%,0,0)" },
    leave: { transform: "translate3d(-50%,0,0)" },
  });
  return (
    <div className="container" onClick={onClick}>
      {transitions((style, i) => {
        const Page = pages[i];
        return <Page style={style} />;
      })}
    </div>
  );
};
export default App;
