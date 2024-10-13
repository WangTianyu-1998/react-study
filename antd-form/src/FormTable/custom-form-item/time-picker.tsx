import type { TimePickerProps, TimeRangePickerProps } from "antd";
import { TimePicker } from "antd";
import { useCallback, useEffect, useState } from "react";
import type { FieldItemProps } from "./index.d";
import type { Dayjs } from "dayjs";

import dayjs from "dayjs";

const defaultProps: TimePickerProps = {
  style: { width: "100%", minWidth: "120px" },

  allowClear: true,
};

export const TimePickerItem: React.FC<FieldItemProps<TimePickerProps>> = (
  props
) => {
  const { itemProps, value, onChange, resetKeysFunc } = props;

  const onValueChange: (date: Dayjs, dateString: string | string[]) => void =
    useCallback(
      (date, dateString) => {
        resetKeysFunc?.();
        itemProps?.onChange?.(date, dateString);
        onChange?.(date, dateString);
      },
      [itemProps, onChange, resetKeysFunc]
    );

  return (
    <TimePicker
      value={value}
      {...defaultProps}
      {...itemProps}
      onChange={onValueChange}
    />
  );
};

const defaultRangeProps: TimeRangePickerProps = {
  style: { width: "100%", minWidth: "120px" },

  allowClear: true,
};

export const TimeRangePickerItem: React.FC<
  FieldItemProps<TimeRangePickerProps>
> = (props) => {
  const { itemProps, value, onChange, resetKeysFunc } = props;
  const [formatValue, setFormatValue] = useState<any>([]);

  useEffect(() => {
    if (Array.isArray(value)) {
      const start = value[0] ? dayjs(value[0], "HH:mm:ss") : "";
      const end = value[1] ? dayjs(value[1], "HH:mm:ss") : "";

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
      [itemProps, onChange, resetKeysFunc]
    );

  return (
    <TimePicker.RangePicker
      value={formatValue}
      {...defaultRangeProps}
      {...itemProps}
      onChange={onValueChange}
    />
  );
};
