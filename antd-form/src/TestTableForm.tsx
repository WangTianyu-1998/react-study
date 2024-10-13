import React, { FC } from "react";
import {
  useCreateCommonColumns,
  useGetTableList,
} from "./TableFormHooks/table";
import { Button, Space, Table } from "antd";
import { getTableListApi } from "./api";

const TestTableForm: FC = () => {
  const { tableProps, nonTableRef, createChangeStatusConfirmFunc } =
    useGetTableList("http://localhost:3000/api/getTableData", {
      initPostData: { page: 1, pageSize: 10, botId: 20 },
    });

  const onDel = createChangeStatusConfirmFunc(getTableListApi, (values) => {
    console.log(values, "@@values");
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
      render: () => {
        return (
          <>
            <Space>
              <Button type="link">编辑</Button>
              <Button type="link">查看</Button>
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

  return (
    <div ref={nonTableRef}>
      <Table {...tableProps} columns={columns} />
    </div>
  );
};
export default TestTableForm;
