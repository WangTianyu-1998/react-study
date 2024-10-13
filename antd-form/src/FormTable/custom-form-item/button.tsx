import { FC } from "react";
import { FieldItemProps } from "./index.d";
import { Button, ButtonProps } from "antd";

export type ButtonAddNameProps = ButtonProps;

type CustomButtonProps = FieldItemProps<ButtonAddNameProps>;

const InputNumberItemDefaultProps: ButtonProps = {
  style: { width: "100%" },
  htmlType: "button",
  type: "primary",
};

export const InputButton: FC<CustomButtonProps> = (props) => {
  const { itemProps, btnName = "按钮" } = props;
  console.log(props, "@@props");

  return (
    <Button {...InputNumberItemDefaultProps} {...itemProps}>
      {btnName}
    </Button>
  );
};
