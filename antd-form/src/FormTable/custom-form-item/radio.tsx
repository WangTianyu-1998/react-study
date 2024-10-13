import type { RadioProps } from 'antd';
import { Radio } from 'antd';
import { useCallback } from 'react';
import type { FieldItemProps } from './index.td';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';

const defaultProps: RadioProps = {
  style: { width: '100%', minWidth: '120px' },

  // allowClear: true,
};
export const RadioGroupItem: React.FC<FieldItemProps<RadioProps>> = (props) => {
  const { itemProps, value, onChange, resetKeysFunc } = props;

  const onValueChange: (e: CheckboxChangeEvent) => void = useCallback(
    (e) => {
      resetKeysFunc?.();
      itemProps?.onChange?.(e);
      onChange?.(e);
    },
    [itemProps, onChange, resetKeysFunc],
  );

  return (
    <Radio.Group
      value={value}
      {...defaultProps}
      {...itemProps}
      onChange={onValueChange}
    />
  );
};
