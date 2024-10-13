import { Cascader } from 'antd';
import { useCallback } from 'react';
import type { FieldItemProps } from './index.td';
import type { DefaultOptionType } from 'antd/es/select';
import type { CascaderProps } from 'antd/lib';

const defaultProps: CascaderProps = {
  placeholder: '请选择',
  style: { width: '100%', minWidth: '120px' },
  showSearch: true,
  getPopupContainer: (triggerNode) => triggerNode.parentNode,
  allowClear: true,
};
export const CascaderItem: React.FC<FieldItemProps<CascaderProps>> = (
  props,
) => {
  const { itemProps, value, onChange, resetKeysFunc } = props;
  const onValueChange = useCallback(
    (e: any, option: DefaultOptionType[]) => {
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
    <Cascader
      value={value}
      {...defaultProps}
      {...(itemProps as any)}
      onChange={onValueChange}
    />
  );
};
