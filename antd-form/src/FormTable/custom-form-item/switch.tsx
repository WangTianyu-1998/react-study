import { Switch } from 'antd';
import { useCallback } from 'react';
import type { FieldItemProps } from './index.td';
import type { SwitchProps } from 'antd/lib';

export const SwitchItem: React.FC<FieldItemProps<SwitchProps>> = (props) => {
  const { itemProps, value, onChange, resetKeysFunc } = props;
  const onValueChange = useCallback(
    (checked: boolean, event: any) => {
      resetKeysFunc?.();
      itemProps?.onChange?.(checked, event);
      onChange?.(checked);
    },
    [itemProps, onChange, resetKeysFunc],
  );

  return <Switch value={value} {...itemProps} onChange={onValueChange} />;
};
