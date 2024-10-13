import type { DatePickerProps } from 'antd';
import { DatePicker } from 'antd';
import { useCallback, useEffect, useMemo, useState } from 'react';
import type { FieldItemProps } from './index.td';
import type { Dayjs } from 'dayjs';
import type { RangePickerProps } from 'antd/lib/date-picker';
import dayjs from 'dayjs';

const defaultProps: DatePickerProps = {
  style: { width: '100%', minWidth: '120px' },

  // allowClear: true,
};

export const DatePickerItem: React.FC<FieldItemProps<DatePickerProps>> = (
  props,
) => {
  const { itemProps, value, onChange, resetKeysFunc } = props;

  const formatValue = useMemo(() => {
    if (value) {
      return dayjs(value);
    }
    return undefined;
  }, [value]);

  const onValueChange: (date: Dayjs, dateString: string | string[]) => void =
    useCallback(
      (date, dateString) => {
        resetKeysFunc?.();
        itemProps?.onChange?.(date, dateString);
        onChange?.(dateString || undefined);
      },
      [itemProps, onChange, resetKeysFunc],
    );

  return (
    <DatePicker
      value={formatValue}
      {...defaultProps}
      {...itemProps}
      onChange={onValueChange}
    />
  );
};

const defaultRangeProps: RangePickerProps = {
  style: { width: '100%', minWidth: '120px' },

  // allowClear: true,
};

export const DateRangePickerItem: React.FC<FieldItemProps<RangePickerProps>> = (
  props,
) => {
  const { itemProps, value, onChange, resetKeysFunc } = props;
  const [formatValue, setFormatValue] = useState<any>([]);

  useEffect(() => {
    if (Array.isArray(value)) {
      const start = value[0] ? dayjs(value[0]) : '';
      const end = value[1] ? dayjs(value[1]) : '';

      setFormatValue([start, end]);
    }
  }, [value]);

  const onValueChange: (dates: any, dateStrings: [string, string]) => void =
    useCallback(
      (dates, dateStrings) => {
        resetKeysFunc?.();
        itemProps?.onChange?.(dates, dateStrings);
        if (Array.isArray(dateStrings) && !dateStrings[0] && !dateStrings[1]) {
          onChange?.(undefined);
          return;
        }
        onChange?.(dateStrings, dates);
      },
      [itemProps, onChange, resetKeysFunc],
    );

  return (
    <DatePicker.RangePicker
      value={formatValue}
      {...defaultRangeProps}
      {...itemProps}
      onChange={onValueChange}
    />
  );
};
