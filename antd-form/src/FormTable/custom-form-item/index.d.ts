import type {
  ButtonProps,
  CascaderProps,
  DatePickerProps,
  InputNumberProps,
  InputProps,
  RadioGroupProps,
  SelectProps,
  SwitchProps,
  TimePickerProps,
  TimeRangePickerProps,
} from "antd";
import type { NamePath } from "antd/es/form/interface";
import type { TextAreaProps } from "antd/es/input";
import type { FormItemProps } from "antd/lib";
import type { RangePickerProps } from "antd/lib/date-picker";
import { ButtonAddNameProps } from "./button";

interface CommonProps {
  resetKeys?: NamePath[];
  destroyed?: boolean;
  btnName?: string;
}

export interface FieldItemProps<T> extends CommonProps {
  itemProps?: T;
  onChange?: any;
  value?: any;
  resetKeysFunc?: () => void;
}

export type CustomFormItemType =
  | "input"
  | "inputNumber"
  | "select"
  | "textArea"
  | "radioGroup"
  | "datePicker"
  | "dateRangePicker"
  | "switch"
  | "timePicker"
  | "timeRangePicker"
  | "cascader"
  | "custom"
  | "button";

export interface CustomFormItemProps<P, T = CustomFormItemType>
  extends CommonProps {
  type: T;
  itemProps?: P;
  col?: number;
}

export interface CustomRenderList {
  type: "renderList";
  rows?: (CustomFormItemUtils & FormItemProps)[];
  cols?: (CustomFormItemUtils & FormItemProps)[];
}

export type CustomFormItemUtils =
  | CustomFormItemProps<InputProps, "input">
  | CustomFormItemProps<TextAreaProps, "textArea">
  | CustomFormItemProps<InputNumberProps, "inputNumber">
  | CustomFormItemProps<SelectProps, "select">
  | CustomFormItemProps<RadioGroupProps, "radioGroup">
  | CustomFormItemProps<DatePickerProps, "datePicker">
  | CustomFormItemProps<RangePickerProps, "dateRangePicker">
  | CustomFormItemProps<SwitchProps, "switch">
  | CustomFormItemProps<TimePickerProps, "timePicker">
  | CustomFormItemProps<TimeRangePickerProps, "timeRangePicker">
  | CustomFormItemProps<CascaderProps, "cascader">
  | CustomFormItemProps<{ component: React.ReactNode }, "custom">
  | CustomFormItemProps<ButtonAddNameProps, "button">;
