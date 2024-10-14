import type { JsonFormItemProps } from "./FormTable/basic-form/index.d";
import { Form, Modal } from "antd";
import { forwardRef, useImperativeHandle } from "react";
import { DetailModalProps, useInitModal } from "./TableFormHooks/modal";
import BasicForm from "./FormTable/basic-form";

const ContentForm = forwardRef(
  (props: { value?: Record<string, any> }, ref) => {
    const { value } = props;
    const [form] = Form.useForm();
    const itemList: JsonFormItemProps[] = [
      {
        label: "业务线id",
        name: "id",
        type: "input",
        itemProps: {
          disabled: value?.id,
        },
        destroyed: !value?.id,
      },
      {
        label: "业务线名称",
        name: "name",
        type: "input",
        rules: [{ required: true }],
      },
    ];
    useImperativeHandle(ref, () => ({
      form,
    }));
    return (
      <BasicForm
        wrapperCol={{ span: 24 }}
        value={value}
        form={form}
        itemList={itemList}
      />
    );
  }
);

export interface DetailModalRefProps {
  toggle?: (record?: any) => Promise<void>;
}

const DetailModal = forwardRef<DetailModalRefProps, DetailModalProps>(
  (props, ref) => {
    const { toggle, detail, modalProps, formRef } = useInitModal({
      detailModalRefProps: props,
      fetchDetailFunc: async (record: Record<string, any>) => {
        return { ret: 0, data: record };
      },
      onSaveFunc: async () => await 123,
    });

    useImperativeHandle(ref, () => ({
      toggle,
    }));
    return (
      <>
        <Modal {...modalProps}>
          <ContentForm value={detail} ref={formRef} />
        </Modal>
      </>
    );
  }
);

export default DetailModal;
