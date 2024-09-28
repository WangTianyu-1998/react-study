import React, { CSSProperties, FC, ReactNode, useState } from "react";
// import './index.scss'
import MonthCalendar from "./MonthCalendar";
import dayjs, { Dayjs } from "dayjs";
import Header from "./Header";
import cs from "classnames";
import LocaleContext from "./LocaleContext";

export type CalendarProps = {
  value: Dayjs;
  style?: CSSProperties;
  className?: string | string[];
  // 定制日期显示,会完全覆盖日期单元格,例如农历,日程安排等
  dateRender?: (currentDate: Dayjs) => ReactNode;
  // 定制日期单元格,内容会被添加到单元格内,只会在日期的数字下添加一些内容,只在全屏日历模式下生效
  dateInnerContent?: (currentDate: Dayjs) => ReactNode;
  // 国际化相关
  locale?: "zh-CN" | "en-US";
  // 选择了日期之后会触发的回调
  onChange?: (date: Dayjs) => void;
};

const Calendar: FC<CalendarProps> = (props: CalendarProps) => {
  const { value, style, className, locale, onChange } = props;
  const [curValue, setCurValue] = useState<Dayjs>(value);
  const [curMonth, setCurMonth] = useState<Dayjs>(value);

  // 合并css
  const classNames = cs("calendar", className);

  const handleSelected = (date: Dayjs) => {
    setCurValue(date);
    setCurMonth(date);
    onChange?.(date);
  };
  const nextMonthHandler = () => {
    setCurMonth(curMonth.add(1, "month"));
  };
  const prevMonthHandler = () => {
    setCurMonth(curMonth.subtract(1, "month"));
  };
  const toDayHandler = () => {
    const date = dayjs(new Date());
    setCurMonth(date);
    setCurValue(date);
    onChange?.(date);
  };
  return (
    <LocaleContext.Provider
      value={{
        // locale 是否存在 不存在就使用系统默认语言
        locale: locale || navigator.language,
      }}
    >
      <div className={classNames} style={style}>
        <Header
          value={curMonth}
          prevMonthHandler={prevMonthHandler}
          nextMonthHandler={nextMonthHandler}
          toDayHandler={toDayHandler}
        />
        <MonthCalendar
          {...props}
          value={curValue}
          curMonth={curMonth}
          handleSelected={handleSelected}
        />
      </div>
    </LocaleContext.Provider>
  );
};
export default Calendar;
