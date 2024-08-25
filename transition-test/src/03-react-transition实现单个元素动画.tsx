import React, { FC, useEffect, useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";
import "./App3.css";
const App: FC = () => {
  const [flag, setFlag] = useState(false);

  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const divEl = divRef.current;
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setFlag(true);
    }, 3000);
  }, []);
  return (
    <div>
      <CSSTransition in={flag} timeout={1000} appear={true}>
        <div id="box" ref={divRef}></div>
      </CSSTransition>
      <button onClick={() => setFlag(!flag)}>{!flag ? "进入" : "离开"}</button>
    </div>
  );
};
export default App;
