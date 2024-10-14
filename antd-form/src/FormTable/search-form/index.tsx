import type { FormInstance, FormProps } from "antd";
import { Button, Col, Form, Row, Space } from "antd";
import { FormItemHOCTypeMap, useModifyProps } from "../custom-form-item";
import { useState, type ReactNode } from "react";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import { JsonFormItemProps } from "../basic-form/index.d";
import { useFormInit } from "../basic-form/hooks";

type BasicFormProps = React.PropsWithChildren<FormProps<any>> & {
  onSubmitCallback?: (value?: any) => void;
  itemList: JsonFormItemProps[];
  col?: number;
  addAfter?: ReactNode;
  expandAt?: number;
  hiddeResetBtn?: boolean;
  form: FormInstance;
};

function renderItemList(
  itemList: JsonFormItemProps[],
  defaultCol: number,
  expand: boolean,
  expandAt: number
): any {
  return itemList.map((item, index) => {
    const { type, name, wrapperCol, label, destroyed, col, hidden } = item;
    const RenderItem = FormItemHOCTypeMap[type];

    if ((item as any).$$typeof) {
      return item;
    }

    if (destroyed) {
      return null;
    }
    const colSpan =
      (!expand && index > expandAt) || hidden ? 0 : col || defaultCol;

    return (
      <Col span={colSpan} key={name || index}>
        <RenderItem
          wrapperCol={label ? wrapperCol : { span: 24 }}
          {...(item as any)}
        />
      </Col>
    );
  });
}

export const defaultProps: React.PropsWithChildren<FormProps<any>> = {
  // labelCol: { span: 8 },
  // wrapperCol: { span: 16 },
  labelAlign: "left",
  colon: false,
  autoComplete: "off",
  scrollToFirstError: true,
  style: { margin: "10px" },
  validateMessages: {
    // eslint-disable-next-line no-template-curly-in-string
    required: "该项不能为空",
  },
};
const SearchForm: React.FC<BasicFormProps> = (props) => {
  const {
    onSubmitCallback,
    col = 6,
    itemList,
    form,
    addAfter,
    expandAt = 9,
    hiddeResetBtn = false,
  } = props;
  const newCol = itemList.length < 6 ? 5 : col;
  const [expand, setExpand] = useState(false);
  const formProps = useModifyProps(props, [
    "itemList",
    "onSubmitCallback",
    "addAfter",
    "hiddeResetBtn",
  ]);
  const { btnLoading, onSubmit, onReset } = useFormInit({
    onSubmitCallback,
    form,
  });

  return (
    <Form {...defaultProps} {...formProps}>
      <Row gutter={24} style={{ width: "100%" }}>
        {renderItemList(itemList, newCol, expand, expandAt)}
        <Col span={newCol <= 4 ? 5 : newCol}>
          <Space>
            <a
              style={{
                display: itemList.length < expandAt ? "none" : "block",
                width: 50,
              }}
              onClick={() => {
                setExpand((e) => !e);
              }}
            >
              {expand ? (
                <>
                  收起
                  <UpOutlined style={{ marginLeft: 5 }} />
                </>
              ) : (
                <>
                  展开
                  <DownOutlined style={{ marginLeft: 5 }} />
                </>
              )}
            </a>
            {hiddeResetBtn ? null : <Button onClick={onReset}>重置</Button>}

            <Button loading={btnLoading} type="primary" onClick={onSubmit}>
              查询
            </Button>
            {addAfter}
          </Space>
        </Col>
      </Row>
    </Form>
  );
};

export default SearchForm;
