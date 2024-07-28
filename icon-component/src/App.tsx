import React, { FC, useCallback, useRef } from "react";
import { IconAdd } from "./icon/icons/IconAdd";
import { IconEmail } from "./icon/icons/IconEmail";
import { createFrontIconfont } from "./icon/createFrontIconfont";
import { IconMap } from "./icon/icons/IconMap";
import RefDemo1 from "./RefDemo1";

const IconFont = createFrontIconfont(
  "//at.alicdn.com/t/c/font_4635445_h28ws36az6s.js"
);

const App: FC = () => {
  const InputRef = useRef<HTMLInputElement>(null);

  const handleClick1 = useCallback(() => {
    InputRef.current?.focus();
  }, []);

  const handleClick2 = useCallback(() => {
    InputRef.current?.blur();
  }, []);

  return (
    <div style={{ padding: "50px" }}>
      <IconAdd size="40px" />
      <IconEmail spin />
      <IconEmail style={{ color: "blue", fontSize: "50px" }} />
      <IconFont type="icon-xiaoxi-zhihui" size="40px" />
      <IconFont type="icon-xihuan" size="40px" fill="blue" />
      <IconMap size="40px" />
      <RefDemo1 value={"2"} ref={InputRef} />
      <button onClick={handleClick1}>focus</button>
      <button onClick={handleClick2}>blur</button>
    </div>
  );
};
export default App;
