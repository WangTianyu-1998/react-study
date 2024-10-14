import { FC, useRef, useState } from "react";

import { Button, Form, Input, Space, Table } from "antd";
import {
  useCreateCommonColumns,
  useGetTableList,
} from "../../TableFormHooks/table";
import DetailModal, { DetailModalRefProps } from "../../DetailModal";
import { getTableListApi } from "../../api";
import { FormItemHOC } from "../../FormTable/custom-form-item";
import SearchForm from "../../FormTable/search-form";
import { JsonFormItemProps } from "../../FormTable/basic-form/index.d";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { DragHandle, DragRow } from "./DragHandle";

const TestTableForm: FC = () => {
  const [form] = Form.useForm();
  const modalRef = useRef<DetailModalRefProps>(null);
  const {
    tableProps,
    createChangeStatusConfirmFunc,
    searchTableList,
    updateTableList,
  } = useGetTableList("http://localhost:3000/api/getTableData", {
    initPostData: { page: 1, pageSize: 10, botId: 20 },
  });

  console.log(tableProps, "@@tableProps");

  const onDel = createChangeStatusConfirmFunc(getTableListApi, (values) => {
    alert("删除成功");
  });

  const columns = useCreateCommonColumns([
    {
      title: "排序",
      dataIndex: "sort",
      width: 80,
      className: "drag-visible",
      render: () => <DragHandle />,
    },
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
  const [selectedRowKeys, setSelectedRowKeys] = useState<any[]>([]);

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    console.log("rendererer");
    if (active.id !== over?.id) {
      const prev = tableProps?.dataSource;
      const activeIndex = prev.findIndex((i) => i.key === active.id);
      const overIndex = prev.findIndex((i) => i.key === over?.id);
      const data = arrayMove(prev, activeIndex, overIndex);
      updateTableList(data);
    }
  };

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
      <DndContext modifiers={[restrictToVerticalAxis]} onDragEnd={onDragEnd}>
        <SortableContext
          items={tableProps?.dataSource.map((i: any) => i.id)}
          strategy={verticalListSortingStrategy}
        >
          <Table
            {...tableProps}
            scroll={{ y: 1200 }}
            components={{ body: { row: DragRow } }}
            rowSelection={{
              selectedRowKeys,
              onChange: (selectedKeys) => {
                setSelectedRowKeys(selectedKeys);
              },
            }}
            columns={columns}
          />
        </SortableContext>
      </DndContext>
    </>
  );
};
export default TestTableForm;
