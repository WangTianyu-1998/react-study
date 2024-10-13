import { Form } from "antd";
import { FC } from "react";
import { FormItemHOC } from "../../FormTable/custom-form-item";
const FormTest: FC = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    alert(`表单提交成功: ${JSON.stringify(values)}`);
  };

  const onFinishFailed = (values: any) => {
    alert("表单提交失败: " + JSON.stringify(values));
  };
  return (
    <Form
      form={form}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      layout="vertical"
    >
      <FormItemHOC.FInput
        name="name"
        label="userName"
        rules={[{ required: true, message: "请输入用户名" }]}
        itemProps={{
          placeholder: "请输入用户名",
          maxLength: 10,
        }}
      />
      <FormItemHOC.FInput
        name="age"
        label="age"
        // resetKeys={["name"]}
        rules={[{ required: true, message: "请输入年龄" }]}
        itemProps={{
          placeholder: "age",
          maxLength: 10,
        }}
      />
      <FormItemHOC.FTextArea
        name="textArea"
        label="textArea"
        rules={[{ required: true, message: "请输入" }]}
        itemProps={{
          placeholder: "textArea",
          rows: 5,
        }}
      />
      <FormItemHOC.FButton
        btnName="提交"
        itemProps={{
          htmlType: "submit",
        }}
      />
    </Form>
  );
};
export default FormTest;
