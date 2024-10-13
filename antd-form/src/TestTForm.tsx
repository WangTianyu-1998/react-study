import { Button, Checkbox, Input } from "antd";
import TForm from "./TForm";
import { useRef } from "react";
import { TFormRefApi } from "./TForm/TForm";

const TestTForm: React.FC = () => {
  const formRef = useRef<TFormRefApi>(null);
  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.error("Failed:", errorInfo);
  };

  const handleClick = () => {
    const formValues = formRef.current?.getFilesValue();
    console.log("🚀 ~ handleClick ~ formValues:", formValues);
  };

  return (
    <>
      <Button onClick={handleClick} type="primary" style={{ margin: 10 }}>
        getFormValues
      </Button>
      <TForm
        initialValues={{ remember: true, username: "帅气的TianYu" }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        ref={formRef}
      >
        <TForm.TItem
          label="Username"
          name="username"
          rules={[
            { required: true, message: "请输入用户名!" },
            { max: 10, message: "长度不能大于 10" },
          ]}
        >
          <Input />
        </TForm.TItem>

        <TForm.TItem
          label="Password"
          name="password"
          rules={[{ required: true, message: "请输入密码!" }]}
        >
          <Input.TextArea />
        </TForm.TItem>

        <TForm.TItem name="remember" valuePropName="checked">
          <Checkbox>记住我</Checkbox>
        </TForm.TItem>

        <TForm.TItem>
          <Button type="primary">登录</Button>
        </TForm.TItem>
      </TForm>
    </>
  );
};

export default TestTForm;
