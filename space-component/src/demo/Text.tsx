import React from "react";

interface TestProps {
  children: React.ReactNode[];
}

function Test(props: TestProps) {
  const children2 = React.Children.toArray(props.children); // 可以看到，React.Children.toArray 对 children 做扁平化。

  //   console.log(props.children);
  //   console.log(children2);
  console.log(children2.sort());

  return <div></div>;
}

export default function TestApp() {
  return (
    <Test>
      {33}
      <span>hello world</span>
      {22}
      {11}
    </Test>
  );
}
