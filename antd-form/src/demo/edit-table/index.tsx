import React, {
  useContext,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import type { GetRef, TableProps } from "antd";
import { Button, Form, Popconfirm, Select, Table, Typography } from "antd";

type FormInstance<T> = GetRef<typeof Form<T>>;

const EditableContext = React.createContext<FormInstance<any> | null>(null);

interface Item {
  id: number;
  name: string;
  sel1: number;
  sel2: number;
}

interface EditableRowProps {
  index: number;
}

const EditableRow = React.forwardRef<any, EditableRowProps>(
  ({ index, ...props }, ref) => {
    const [form] = Form.useForm();

    useImperativeHandle(ref, () => ({
      form, // 暴露 form 实例
    }));

    return (
      <Form form={form} component={false}>
        <EditableContext.Provider value={form}>
          <tr {...props} />
        </EditableContext.Provider>
      </Form>
    );
  }
);

interface EditableCellProps {
  title: React.ReactNode;
  editable: boolean;
  dataIndex: keyof Item;
  record: Item;
  handleSave: (record: Item) => void;
  onChange?: (value: any) => void;
}

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

  useEffect(() => {
    if (!dataIndex) return;
    form.setFieldsValue({ [dataIndex]: record?.[dataIndex] }); // 确保每次更新时，Form 回显当前行的值
  }, [form, record, dataIndex]);

  const save = async (value: any) => {
    try {
      handleSave({ ...record, [dataIndex]: value });
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
    }
  };

  let childNode = children;

  if (dataIndex === "sel1") {
    childNode = (
      <>
        <Form.Item
          style={{ margin: 0 }}
          name={dataIndex}
          rules={[{ required: true }]}
          validateTrigger="onChange" // 设置实时校验触发条件
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
      </>
    );
  } else if (dataIndex === "sel2") {
    childNode = (
      <>
        <Form.Item
          style={{ margin: 0 }}
          name={dataIndex}
          rules={[{ required: true }]}
          validateTrigger="onChange" // 设置实时校验触发条件
        >
          <Select
            onChange={save}
            options={[
              { value: 1, label: "sel2 1" },
              { value: 2, label: "sel2 2" },
              { value: 3, label: "sel2 3" },
            ]}
            allowClear
          />
        </Form.Item>
      </>
    );
  }
  return <td {...restProps}>{childNode}</td>;
};

interface DataType {
  id: number;
  name: string;
  sel1: number | undefined;
  sel2: number | undefined;
}

type ColumnTypes = Exclude<TableProps<DataType>["columns"], undefined>;

const EditTable: React.FC = () => {
  const form = Form.useFormInstance();
  const [dataSource, setDataSource] = useState<any[]>([]);
  const editFormList = Form.useWatch("editFormList", form);

  const syncFormWithDataSource = (newData: any[]) => {
    form.setFieldsValue({ editFormList: newData });
  };

  useEffect(() => {
    if (JSON.stringify(dataSource) !== JSON.stringify(editFormList)) {
      setDataSource(editFormList);
    }
  }, [editFormList]);

  const handleDelete = (id: number) => {
    const newData = dataSource.filter((item) => item.id !== id);
    setDataSource(newData);
    syncFormWithDataSource(newData);
  };

  const defaultColumns: (ColumnTypes[number] & {
    editable?: boolean;
    dataIndex: string;
  })[] = [
    {
      title: "name",
      dataIndex: "name",
      width: "30%",
    },
    {
      title: "sel1",
      dataIndex: "sel1",
      editable: true,
    },
    {
      title: "sel2",
      dataIndex: "sel2",
      editable: true,
    },
    {
      title: "operation",
      dataIndex: "operation",
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleDelete(record.id)}
          >
            <a>Delete</a>
          </Popconfirm>
        ) : null,
    },
  ];

  const handleAdd = () => {
    const newData: DataType = {
      id: parseInt((Math.random() * 1000).toFixed(0)),
      name: `1`,
      sel1: undefined,
      sel2: undefined,
    };
    console.log("🚀 ~ handleAdd ~ newData:", newData);
    const updatedData = [...dataSource, newData];
    setDataSource(updatedData);
    syncFormWithDataSource(updatedData);
  };

  const handleSave = (row: DataType) => {
    console.log("🚀 ~ handleSave ~ row:", row);
    const updatedDataSource = dataSource.map((item) =>
      item?.id === row?.id ? { ...item, ...row } : item
    );
    console.log("🚀 ~ handleSave ~ updatedDataSource:", updatedDataSource);
    setDataSource(updatedDataSource);
    syncFormWithDataSource(updatedDataSource);
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
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
    <div>
      <Button onClick={handleAdd} type="primary" style={{ marginBottom: 16 }}>
        Add a row
      </Button>
      <Table<DataType>
        components={components}
        rowClassName={() => "editable-row"}
        bordered
        dataSource={dataSource}
        columns={columns as ColumnTypes}
        rowKey="id"
      />
    </div>
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

  const handleClick = async () => {
    const res = await form.validateFields({
      recursive: true,
    });
    console.log("🚀 ~ handleClick ~ res:", res);
  };

  const isEmpty = (value: any) => {
    return value === undefined || value === null || value === "";
  };

  const validatorFormList = () => {
    const value = form.getFieldValue("editFormList");
    console.log("🚀 ~ validatorFormList ~ value:", value);
    console.log("🚀 ~ validatorFormList ~ value:", value);
    if (value?.length === 0) {
      return Promise.reject("At least one item");
    }
    const hasEmpty = value.some(
      (item: any) => isEmpty(item.sel1) || isEmpty(item.sel2)
    );
    if (hasEmpty) {
      return Promise.reject("请填写完整的信息");
    }
    return Promise.resolve();
  };

  return (
    <>
      <Button onClick={handleClick}>submit</Button>
      <Form form={form} onFinish={handleClick}>
        <Form.Item
          name="editFormList"
          rules={[
            {
              validator: validatorFormList,
            },
          ]}
        >
          <EditTable />
        </Form.Item>
        <Form.Item shouldUpdate>
          {() => (
            <Typography>
              <pre>{JSON.stringify(form.getFieldsValue(), null, 2)}</pre>
            </Typography>
          )}
        </Form.Item>
      </Form>
    </>
  );
};

export default EditFormTable;
