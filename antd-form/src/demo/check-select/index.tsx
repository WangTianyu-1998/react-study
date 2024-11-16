import type { CheckboxProps } from "antd";
import { Checkbox, Divider, Form, Select, Space } from "antd";
import type { Rule } from "antd/es/form";
import type { ReactNode } from "react";
import { useCallback, useEffect, useMemo, useState, type FC } from "react";

interface Props {
  name: string;
  label: ReactNode;
  rules?: Rule[];
  options: any[];
  placeholder?: string;
  loading?: boolean;
}

const { Option } = Select;

const CustomSelect: FC<{
  value?: number[];
  onChange?: any;
  options: any[];
  placeholder?: string;
  loading?: boolean;
}> = ({ value = [], onChange, options, placeholder, loading = false }) => {
  const [selectedItems, setSelectedItems] = useState<number[]>(value);

  const allOptionsValue = useMemo(() => {
    if (!options?.length) return [];
    return options.map((s) => s.value) ?? [];
  }, [options]);

  const handleSelectChange = useCallback(
    (check: number[]) => {
      setSelectedItems(check);
      onChange?.(check);
    },
    [onChange]
  );

  const handleAllChange: CheckboxProps["onChange"] = useCallback(
    (e: any) => {
      if (e.target.checked) {
        setSelectedItems(allOptionsValue);
        onChange?.(value);
      } else {
        setSelectedItems([]);
        onChange?.([]);
      }
    },
    [allOptionsValue, onChange, value]
  );

  useEffect(() => {
    if (value) {
      setSelectedItems(value);
    }
  }, [value]);

  return (
    <Select
      mode="multiple"
      value={selectedItems}
      loading={loading}
      allowClear
      onChange={handleSelectChange}
      style={{ width: "300px" }}
      placeholder={placeholder}
      aria-checked={true}
      options={options}
      dropdownRender={(menu) => (
        <>
          <div style={{ padding: "8px 12px" }}>
            <Checkbox
              indeterminate={
                selectedItems.length > 0 &&
                selectedItems.length < options.length
              }
              checked={selectedItems.length === options.length}
              onChange={handleAllChange}
            >
              全选
            </Checkbox>
          </div>
          <Divider style={{ margin: "4px 0" }} />
          {menu}
        </>
      )}
      optionRender={(option) => (
        <Space>
          <Checkbox
            checked={selectedItems.includes(option.data.value)}
            aria-label={option.data.label}
          >
            {option.data.emoji}
          </Checkbox>
          {option.data.label}
        </Space>
      )}
    />
  );
};

const CheckSelect: FC<Props> = (props) => {
  const {
    name,
    label,
    rules = [{ required: true }],
    options = [],
    placeholder = "请输入",
    loading,
  } = props;
  return (
    <Form.Item label={label} name={name} rules={rules}>
      <CustomSelect
        options={options}
        loading={loading}
        placeholder={placeholder}
      />
    </Form.Item>
  );
};

const CheckSelectDemo = () => {
  const [form] = Form.useForm();

  const onValuesChange = (value: any) => {
    console.log(value);
  };

  return (
    <Form form={form} onValuesChange={onValuesChange}>
      <CheckSelect
        name="check"
        label="多选"
        options={[
          { label: "test1", value: 1 },
          { label: "test2", value: 2 },
          { label: "test3", value: 3 },
          { label: "test4", value: 4 },
          { label: "test5", value: 5 },
          { label: "test6", value: 6 },
        ]}
      />
    </Form>
  );
};

export default CheckSelectDemo;
