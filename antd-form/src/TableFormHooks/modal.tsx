import { message } from "antd";
import type { FormInstance } from "antd/lib";
import { useCallback, useRef, useState } from "react";

export interface DetailModalProps {
  onSaveCallback?: () => any;
  onSaveCallbackWithValue?: (values: any) => any; // 兼容
}

export interface InitModalProps {
  fetchDetailFunc?: (args: any) => Promise<{ ret: number; data: any }>;
  onSaveFunc?: (values: any) => Promise<any>;
  detailModalRefProps?: DetailModalProps;
}

export function useInitModal(props: InitModalProps) {
  const { fetchDetailFunc, onSaveFunc, detailModalRefProps } = props;
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const [detail, setDetail] = useState<Record<string, any>>();
  const formRef = useRef<{ form: FormInstance }>(null);
  const [result, setResult] = useState<Record<string, any>>();

  const toggle = useCallback(
    async (record?: any) => {
      if (!visible) {
        if (record && fetchDetailFunc) {
          console.log("🚀 ~ record:", record);
          const { ret, data } = await fetchDetailFunc(record);
          if (ret === 0) {
            setDetail(data);
          }
        }
      } else {
        setDetail(undefined);
        setResult(undefined);
      }
      setVisible((v) => !v);
    },
    [fetchDetailFunc, visible]
  );

  const onSave = useCallback(async () => {
    try {
      setConfirmLoading(true);
      const values = await formRef.current?.form?.validateFields?.();
      if (onSaveFunc) {
        const res = await onSaveFunc(values);

        if (res?.ret === 0) {
          message.success("操作完成");
        }
        setResult(res);
        // 关闭后重新请求列表
        detailModalRefProps?.onSaveCallback?.();
        detailModalRefProps?.onSaveCallbackWithValue?.(values);
        // 兼容导入，如果有错误信息，则不关闭
        if (res?.ret === 0 && res?.data?.errorMsg) {
          return;
        }
      }

      toggle();
    } finally {
      setConfirmLoading(false);
    }
  }, [detailModalRefProps, onSaveFunc, toggle]);

  const title = detail?.id ? "编辑" : "新建";

  return {
    modalProps: {
      open: visible,
      confirmLoading,
      onCancel: () => toggle(),
      onOk: onSave,
      title,
      destroyOnClose: true,
      width: 550,
      maskClosable: false,
    },
    toggle,
    detail,
    formRef,
    confirmLoading,
    result,
  };
}
