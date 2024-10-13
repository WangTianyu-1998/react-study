import type { SelectProps } from 'antd';
import { Select } from 'antd';
import { useCallback } from 'react';
import type { FieldItemProps } from './index.td';
import type { DefaultOptionType } from 'antd/es/select';

const defaultProps: SelectProps = {
  placeholder: '请选择',
  optionFilterProp: 'label',
  style: { width: '100%', minWidth: '120px' },
  showSearch: true,
  getPopupContainer: (triggerNode) => triggerNode.parentNode,
  allowClear: true,
};
export const SelectItem: React.FC<FieldItemProps<SelectProps>> = (props) => {
  const { itemProps, value, onChange, resetKeysFunc } = props;
  const onValueChange = useCallback(
    (e: any, option: DefaultOptionType | DefaultOptionType[]) => {
      resetKeysFunc?.();
      itemProps?.onChange?.(e, option);
      if (Array.isArray(e) && e.length === 0) {
        onChange?.(undefined);
      } else {
        onChange?.(e);
      }
    },
    [itemProps, onChange, resetKeysFunc],
  );

  return (
    <Select
      value={value}
      {...defaultProps}
      {...itemProps}
      onChange={onValueChange}
    />
  );
};
