import React, { FC, forwardRef } from "react";

type RefDemo1Type = HTMLInputElement;

type Props = {
  value: string;
};

const RefDemo1 = forwardRef<RefDemo1Type, Props>((props, ref) => {
  const { value = "" } = props;

  return <input type="text" value={value} ref={ref} />;
});

export default RefDemo1;
