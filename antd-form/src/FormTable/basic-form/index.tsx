import type { FormProps } from "antd";
import { Form } from "antd";
import { FormItemHOCTypeMap, useModifyProps } from "../custom-form-item";
import { useEffect } from "react";
import { JsonFormItemProps } from "./index.d";

type BasicFormProps = React.PropsWithChildren<FormProps<any>> & {
  onSubmitCallback?: (value?: any) => void;
  itemList: JsonFormItemProps[];
  value?: Record<string, any>;
};

export const defaultProps: FormProps<any> = {
  labelCol: { span: 6 },
  wrapperCol: { span: 12 },
  labelAlign: "left",
  colon: false,
  autoComplete: "off",
  scrollToFirstError: true,
  validateMessages: {
    // eslint-disable-next-line no-template-curly-in-string
    required: "该项不能为空",
  },
};

function renderItemList(itemList: JsonFormItemProps[]) {
  return itemList.map((item, index) => {
    const { type, name, wrapperCol, label, destroyed } = item;
    const RenderItem = FormItemHOCTypeMap[type];

    if ((item as any).$$typeof) {
      return item;
    }

    if (destroyed) {
      return null;
    }

    return (
      <RenderItem
        key={name || index}
        wrapperCol={label ? wrapperCol : { span: 24 }}
        {...(item as any)}
      />
    );
  });
}

const BasicForm: React.FC<BasicFormProps> = (props) => {
  const { itemList, value, form } = props;
  const formProps = useModifyProps(props, ["itemList"]);

  // initvalue
  useEffect(() => {
    form?.setFieldsValue(value);
  }, [form, value]);

  return (
    <Form {...defaultProps} {...formProps}>
      {renderItemList(itemList)}
    </Form>
  );
};

export default BasicForm;
