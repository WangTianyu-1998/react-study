import React, { FC } from "react";
import {
  useCreateCommonColumns,
  useGetTableList,
} from "./TableFormHooks/table";
import { Button, Space, Table } from "antd";
import { getTableListApi } from "./api";

const TestTableForm: FC = () => {
  const { tableProps, nonTableRef } = useGetTableList(
    "http://localhost:3000/api/getTableData",
    {
      initPostData: { page: 1, pageSize: 10, botId: 20 },
    }
  );

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
