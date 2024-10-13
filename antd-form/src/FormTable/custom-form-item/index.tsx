import {
  CascaderProps,
  Form,
  FormItemProps,
  InputNumberProps,
  InputProps,
  RadioGroupProps,
  SelectProps,
  SwitchProps,
  TimePickerProps,
  TimeRangePickerProps,
  ButtonProps,
} from "antd";
import { CustomFormItemType, CustomFormItemUtils } from "./index.d";
import { FC, ReactNode, useCallback, useMemo } from "react";
import { NamePath } from "antd/es/form/interface";
import { InputItem, InputNumberItem, TextAreaItem } from "./input";
import { TextAreaProps } from "antd/es/input";
import { SelectItem } from "./select";
import { RadioGroupItem } from "./radio";
import { CascaderItem } from "./cascader";
import { DatePickerItem, DateRangePickerItem } from "./date";
import { SwitchItem } from "./switch";
import { TimePickerItem, TimeRangePickerItem } from "./time-picker";
import { ButtonAddNameProps, InputButton } from "./button";

type CFormItemProps = FormItemProps & CustomFormItemUtils;

// 删除props中的指定key
export const useModifyProps = (props: any, delKeys: string[]) => {
  const formItemProps = useMemo(() => {
    const propsObj: any = {
      ...props,
    };
    delKeys.forEach((key) => {
      delete propsObj[key];
    });

    return propsObj;
  }, [delKeys, props]);
  return formItemProps;
};

export const CustomFormItemMap: Record<
  CustomFormItemType,
  FC<{
    itemProps?: any;
    onChange?: any;
    value?: any;
    resetKeysFunc?: any;
    btnName?: string;
  }>
> = {
  input: InputItem,
  textArea: TextAreaItem,
  inputNumber: InputNumberItem,
  select: SelectItem,
  radioGroup: RadioGroupItem,
  datePicker: DatePickerItem,
  dateRangePicker: DateRangePickerItem,
  switch: SwitchItem,
  timePicker: TimePickerItem,
  timeRangePicker: TimeRangePickerItem,
  cascader: CascaderItem,
  custom: InputItem,
  button: InputButton,
};

function CustomFormItem(props: CFormItemProps): ReactNode {
  const { type, itemProps, resetKeys, btnName } = props;
  const form = Form.useFormInstance();

  // 重置指定的key
  const resetKeysFunc = useCallback(() => {
    if (Array.isArray(resetKeys)) {
      form.setFields(
        resetKeys.map((item) => ({ name: item, value: undefined }))
      );
    }
  }, [form, resetKeys]);

  // 通过type获取对应的组件
  const Render = useMemo(() => CustomFormItemMap[type], [type]);

  // 删除props中的itemProps,destroyed,resetKeys 为什么?
  // 因为这些props不需要传递给Form.Item
  const formItemProps = useModifyProps(props, [
    "itemProps",
    "destroyed",
    "resetKeys",
    "btnName",
  ]);

  return (
    <Form.Item {...formItemProps}>
      <Render
        itemProps={itemProps}
        resetKeysFunc={resetKeysFunc}
        btnName={btnName}
      />
    </Form.Item>
  );
}

// 通过Wrapper包裹组件,并且传入对应的type
function Wrapper<T>(type: CustomFormItemType) {
  return (
    props: FormItemProps & {
      itemProps?: T;
      resetKeys?: NamePath[];
      btnName?: string;
    }
  ) => {
    return <CustomFormItem type={type} {...(props as any)} />;
  };
}

// 通过Wrapper包裹组件,并且传入对应的type

export const FormItemHOC = {
  FInput: Wrapper<InputProps>("input"),
  FSelect: Wrapper<SelectProps>("select"),
  FTextArea: Wrapper<TextAreaProps>("textArea"),
  FInputNumber: Wrapper<InputNumberProps>("inputNumber"),
  FRadioGroup: Wrapper<RadioGroupProps>("radioGroup"),
  FDatePicker: Wrapper<RadioGroupProps>("datePicker"),
  FdateRangePicker: Wrapper<RadioGroupProps>("dateRangePicker"),
  FSwitch: Wrapper<SwitchProps>("switch"),
  FTimePicker: Wrapper<TimePickerProps>("timePicker"),
  FtimeRangePicker: Wrapper<TimeRangePickerProps>("timePicker"),
  FCascader: Wrapper<CascaderProps>("cascader"),
  FCustom: Wrapper<{ component: React.ReactNode }>("custom"),
  FButton: Wrapper<ButtonAddNameProps>("button"),
};

export const FormItemHOCTypeMap: Record<CustomFormItemType, any> = {
  input: FormItemHOC.FInput,
  textArea: FormItemHOC.FTextArea,
  inputNumber: FormItemHOC.FInputNumber,
  select: FormItemHOC.FSelect,
  radioGroup: FormItemHOC.FRadioGroup,
  datePicker: FormItemHOC.FDatePicker,
  dateRangePicker: FormItemHOC.FdateRangePicker,
  switch: FormItemHOC.FSwitch,
  timePicker: FormItemHOC.FTimePicker,
  timeRangePicker: FormItemHOC.FtimeRangePicker,
  cascader: FormItemHOC.FCascader,
  custom: FormItemHOC.FCustom,
  button: FormItemHOC.FButton,
};
