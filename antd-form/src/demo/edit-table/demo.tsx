import {
  Button,
  Form,
  GetRef,
  Popconfirm,
  Select,
  Table,
  Typography,
} from "antd";

import React, { useContext, useEffect } from "react";

interface EditableRowProps {
  index: number;
}

interface Item {
  id: number;
  name: string;
  sel1: number;
  sel2: number;
}

interface DataType {
  id: number;
  name: string;
  sel1: number | undefined;
  sel2: number | undefined;
}

interface EditableRowProps {
  index: number;
}

type FormInstance<T> = GetRef<typeof Form<T>>;

const EditableContext = React.createContext<FormInstance<any> | null>(null);

interface EditableRowProps {
  index: number;
}

interface EditableCellProps {
  title: React.ReactNode;
  editable: boolean;
  dataIndex: keyof Item;
  record: Item;
  handleSave: (record: Item) => void;
  onChange?: (value: any) => void;
}

const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
  return <tr {...props} />;
};

const EditableCell: React.FC<React.PropsWithChildren<EditableCellProps>> = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const form = useContext(EditableContext)!;

  const save = async (value: any) => {
    try {
      handleSave({ ...record, [dataIndex]: value });
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = (
      <Form.Item
        style={{ margin: 0 }}
        name={[record.id, dataIndex]} // 绑定到外部Form的唯一字段
        rules={[{ required: true, message: `${title} is required.` }]}
      >
        <Select
          onChange={save}
          options={[
            { value: 1, label: "sel1 1" },
            { value: 2, label: "sel1 2" },
            { value: 3, label: "sel1 3" },
          ]}
          allowClear
        />
      </Form.Item>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};
const EditTable: React.FC = () => {
  const form = useContext(EditableContext);

  const handleSave = (row: DataType) => {
    const newData = form
      ?.getFieldValue("editFormList")
      .map((item: DataType) =>
        item.id === row.id ? { ...item, ...row } : item
      );

    form?.setFieldsValue({ editFormList: newData });
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Sel1",
      dataIndex: "sel1",
      editable: true,
    },
    {
      title: "Sel2",
      dataIndex: "sel2",
      editable: true,
    },
    {
      title: "Operation",
      dataIndex: "operation",
      render: (_: any, __: any, index: number) => (
        <Popconfirm
          title="Sure to delete?"
          onConfirm={() => handleDelete(index)} // 传递 index，使用 remove 来删除项目
        >
          <a>Delete</a>
        </Popconfirm>
      ),
    },
  ];

  const handleDelete = (index: number) => {
    const currentData = form?.getFieldValue("editFormList");
    const newData = currentData.filter((_: any, idx: number) => idx !== index);
    form?.setFieldsValue({ editFormList: newData });
  };

  const columnsWithEditable = columns.map((col) => {
    if (!col.editable) return col;
    return {
      ...col,
      onCell: (record: DataType) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });

  return (
    <Form.List name="editFormList">
      {(fields, { add }) => (
        <>
          <Button
            onClick={() => add()}
            type="primary"
            style={{ marginBottom: 16 }}
          >
            Add a row
          </Button>
          <Table
            components={{
              body: {
                row: EditableRow,
                cell: EditableCell,
              },
            }}
            dataSource={fields.map((field) => ({
              key: field.key, // 用于唯一标识每一行
              id: field.name, // 对应的表单字段名称
              ...form?.getFieldValue(["editFormList", field.name]), // 从表单中获取值
            }))}
            columns={columnsWithEditable}
            rowKey="key" // 使用 key 作为唯一标识
          />
        </>
      )}
    </Form.List>
  );
};

const EditFormTable = () => {
  const [form] = Form.useForm();

  const getApi = async () => {
    return await fetch("http://localhost:3000/api/getTableData", {
      method: "POST",
    }).then((res) => res.json());
  };

  useEffect(() => {
    getApi().then((res) => {
      const data = res.data.records;
      console.log("🚀 ~ getApi ~ data:", data);
      form.setFieldsValue({ editFormList: data });
    });
  }, [getApi]);

  const handleSubmit = async () => {
    try {
      await form.validateFields();
      console.log("Form Values:", form.getFieldsValue());
    } catch (err) {
      console.error("Validation Failed:", err);
    }
  };

  return (
    <Form form={form} onFinish={handleSubmit}>
      <EditableContext.Provider value={form}>
        <Form.Item
          name="editFormList"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <EditTable />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
        <Form.Item shouldUpdate>
          {() => (
            <Typography>
              <pre>{JSON.stringify(form.getFieldsValue(), null, 2)}</pre>
            </Typography>
          )}
        </Form.Item>
      </EditableContext.Provider>
    </Form>
  );
};

export default EditFormTable;
