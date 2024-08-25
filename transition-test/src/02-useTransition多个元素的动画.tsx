import { useTransition, animated } from "@react-spring/web";
import React, { FC, useState } from "react";
import "./App2.css";

const App: FC = () => {
  const [items, setItems] = useState([
    { id: 1, text: "王" },
    { id: 2, text: "添" },
  ]);

  const transitions = useTransition(items, {
    initial: { transform: "translate3d(0%,0,0)", opacity: 1 }, // 初始状态
    from: { transform: "translate3d(100%,0,0)", opacity: 0 },
    enter: { transform: "translate3d(0%,0,0)", opacity: 1 },
    leave: { transform: "translate3d(-100%,0,0)", opacity: 0 },
  });
  return (
    <>
      <div className="item-box">
        {transitions((style, i) => {
          return (
            <animated.div className="item" style={style}>
              <span
                className="del-btn"
                onClick={() => {
                  setItems(items.filter((item) => item.id !== i.id));
                }}
              >
                x
              </span>
              {i.text}
            </animated.div>
          );
        })}
      </div>
      <div
        className="btn"
        onClick={() => {
          setItems([...items, { id: items.length + 1, text: "我爱你" }]);
        }}
      >
        add
      </div>
    </>
  );
};
export default App;
