import { FC, useRef } from "react";
import {
  useCreateCommonColumns,
  useGetTableList,
} from "./TableFormHooks/table";
import { Button, Form, Input, Space, Table } from "antd";
import { getTableListApi } from "./api";
import SearchForm from "./FormTable/search-form";
import { JsonFormItemProps } from "./FormTable/basic-form/index.d";
import { FormItemHOC } from "./FormTable/custom-form-item";
import DetailModal, { DetailModalRefProps } from "./DetailModal";

const TestTableForm: FC = () => {
  const [form] = Form.useForm();
  const modalRef = useRef<DetailModalRefProps>(null);
  const {
    tableProps,
    nonTableRef,
    createChangeStatusConfirmFunc,
    searchTableList,
    updateTableList,
  } = useGetTableList("http://localhost:3000/api/getTableData", {
    initPostData: { page: 1, pageSize: 10, botId: 20 },
  });

  const onDel = createChangeStatusConfirmFunc(getTableListApi, (values) => {
    alert("删除成功");
  });

  const columns = useCreateCommonColumns([
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "name",
      dataIndex: "name",
    },
    {
      title: "age",
      dataIndex: "age",
    },
    {
      title: "phoneNumber",
      dataIndex: "phoneNumber",
    },
    {
      title: "操作",
      dataIndex: "operation",
      render: (_, record) => {
        return (
          <>
            <Space>
              <Button
                type="link"
                onClick={() => {
                  modalRef.current?.toggle?.(record);
                }}
              >
                编辑
              </Button>
              <Button
                type="link"
                onClick={() => {
                  modalRef.current?.toggle?.(record);
                }}
              >
                查看
              </Button>
              <Button
                type="link"
                onClick={() => {
                  onDel({
                    requestPostData: { id: 1 },
                    skipError: true,
                  });
                }}
              >
                删除
              </Button>
            </Space>
          </>
        );
      },
    },
  ]);

  const itemList: JsonFormItemProps[] = [
    { label: "业务线 id", name: "id", type: "input", itemProps: {} },
    { label: "业务线名称1", name: "name", type: "input", itemProps: {} },
    { label: "业务线名称2", name: "qwe", type: "input", itemProps: {} },
    {
      label: "业务线名称3",
      name: "qwe",
      type: "input",
      itemProps: {},
      destroyed: true,
    },
    <FormItemHOC.FInput label="分类id" name="sortId" />,
    <Form.Item name="test" label="再来一个" style={{ marginLeft: 15 }}>
      <Input />
    </Form.Item>,
  ];

  return (
    <>
      <DetailModal ref={modalRef} onSaveCallback={updateTableList} />
      <SearchForm
        form={form}
        itemList={itemList}
        onSubmitCallback={searchTableList}
        addAfter={
          <Button
            type="primary"
            onClick={() => {
              modalRef.current?.toggle?.();
            }}
          >
            新增
          </Button>
        }
      />
      <div ref={nonTableRef}>
        <Table {...tableProps} columns={columns} />
      </div>
    </>
  );
};
export default TestTableForm;
