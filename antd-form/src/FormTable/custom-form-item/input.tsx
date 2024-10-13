import { Input, InputNumber, InputNumberProps, InputProps } from "antd";
import { ChangeEvent, FC, useCallback } from "react";
import type { FieldItemProps } from "./index.d";
import { TextAreaProps } from "antd/es/input";

const InputItemDefaultProps: InputProps = {
  placeholder: "请输入",
  allowClear: true,
  style: { width: "100%" },
};

export const InputItem: FC<FieldItemProps<InputProps>> = (props) => {
  const { itemProps, onChange, value, resetKeysFunc } = props;

  const onValueChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      resetKeysFunc?.();
      itemProps?.onChange?.(e);
      onChange?.(value);
    },
    [itemProps, onChange, resetKeysFunc]
  );

  return (
    <Input
      value={value}
      {...InputItemDefaultProps}
      {...itemProps}
      onChange={onValueChange}
    />
  );
};

const TextAreaItemDefaultProps: TextAreaProps = {
  showCount: true,
  rows: 1,
  style: { width: "100%" },
  placeholder: "请输入",
  allowClear: true,
};
export const TextAreaItem: React.FC<FieldItemProps<TextAreaProps>> = (
  props
) => {
  const { itemProps, onChange, value, resetKeysFunc } = props;

  const onValueChange: React.ChangeEventHandler<HTMLTextAreaElement> =
    useCallback(
      (e) => {
        resetKeysFunc?.();
        itemProps?.onChange?.(e);
        onChange?.(e.target.value);
      },
      [itemProps, onChange, resetKeysFunc]
    );
  return (
    <Input.TextArea
      value={value}
      {...TextAreaItemDefaultProps}
      {...itemProps}
      onChange={onValueChange}
    />
  );
};

const InputNumberItemDefaultProps: InputNumberProps = {
  style: { width: "100%" },
  placeholder: "请输入",
};
export const InputNumberItem: React.FC<FieldItemProps<InputNumberProps>> = (
  props
) => {
  const { itemProps, value, onChange, resetKeysFunc } = props;
  const onValueChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    (e: any) => {
      resetKeysFunc?.();
      itemProps?.onChange?.(e);
      onChange?.(e);
    },
    [itemProps, onChange, resetKeysFunc]
  );
  return (
    <InputNumber
      value={value}
      {...InputNumberItemDefaultProps}
      {...itemProps}
      onChange={onValueChange}
    />
  );
};
