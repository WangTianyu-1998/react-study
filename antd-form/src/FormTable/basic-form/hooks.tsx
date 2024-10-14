import { FormInstance } from "antd";
import { useCallback, useState } from "react";

interface FormInitProps {
  onSubmitCallback?: (values: any) => void;
  form: FormInstance;
}

export function useFormInit(props: FormInitProps) {
  const { onSubmitCallback, form } = props;
  const [btnLoading, setBtnLoading] = useState(false);

  const onSubmit = useCallback(async () => {
    const values = await form.validateFields();
    try {
      setBtnLoading(true);
      onSubmitCallback && onSubmitCallback(values);
    } finally {
      setBtnLoading(false);
    }
  }, [form, onSubmitCallback]);

  const onReset = useCallback(() => {
    form?.resetFields();
  }, [form]);

  return {
    btnLoading,
    onSubmit,
    onReset,
  };
}
