import {
  ChangeEvent,
  CSSProperties,
  FC,
  memo,
  ReactElement,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import IFromContext from "./FormContext";
import React from "react";
import Schema from "async-validator";
import classNames from "classnames";

export interface TItemProps {
  className?: string;
  style?: CSSProperties;
  label?: ReactNode;
  name?: string;
  valuePropName?: string; // valuePropName 默认是 value，当 checkbox 等表单项就要取 checked 属性了
  rules?: Array<Record<string, any>>;
  children: ReactElement; // 这里 children 类型为 ReactElement 而不是 ReactNode。 因为ReactNode除了ReactElement还包括了字符串、数字等
}

// 兼容checkbox、radio等表单项的值
const getValueFormEvent = (e: ChangeEvent<HTMLInputElement>) => {
  const { target } = e;
  if (target.type === "checkbox") {
    return target.checked;
  } else if (target.type === "radio") {
    return target.value;
  }
  return target.value;
};

const TFormItem: FC<TItemProps> = (props) => {
  const { className, style, label, name, valuePropName, rules, children } =
    props;

  // 如果没有传入 name 参数，那就直接返回 children。
  if (!name) {
    return children;
  }

  const [value, setValue] = useState<string | number | boolean>();
  const [error, setError] = useState<string>("");

  const { onValueChange, values, validateRegister } = useContext(IFromContext);

  // 从 context 中读取对应 name 的 values 的值，同步设置 Item中的value
  useEffect(() => {
    if (value !== values?.[name]) {
      setValue(values?.[name]);
    }
  }, [value, values?.[name]]);

  // 然后React.cloneElement复制children,额外传入value,onChange等参数
  const propsName: Record<string, any> = {};
  if (valuePropName) {
    propsName[valuePropName] = value;
  } else {
    propsName.value = value;
  }
  console.log("🚀 ~ propsName:", propsName);

  // 利用async-validator校验规则
  const handleValidate = (value: any) => {
    let errorMsg = null;
    const isRulesLength = Array.isArray(rules) && rules.length;
    if (isRulesLength) {
      const validate = new Schema({
        [name]: rules.map((rule) => {
          return {
            type: "string",
            ...rule,
          };
        }),
      });

      validate.validate({ [name]: value }, (errors) => {
        if (errors) {
          if (errors?.length) {
            setError(errors[0].message!);
            errorMsg = errors[0].message!;
          }
        } else {
          setError("");
          errorMsg = null;
        }
      });
    }
    return errorMsg;
  };

  useEffect(() => {
    validateRegister?.(name, () => handleValidate(value));
    console.log(React.Children.toArray(children), "@@propsName");
  }, [value, children]);

  const childEle = useMemo(() => {
    // 调用 Children.toArray(children) 能够通过 children 处理并创建一个数组。
    // React.cloneElement 会克隆一个元素并传入新的 props。
    return React.Children.toArray(children).length > 1
      ? children
      : React.cloneElement(children, {
          ...propsName,
          onChange: (e: ChangeEvent<HTMLInputElement>) => {
            const value = getValueFormEvent(e);
            console.log("🚀 ~ value:", value);
            console.log("🚀 ~ name:", name);
            setValue(value); // 设置当前组件的value
            onValueChange?.(name, value); // 设置Form组件的value
            handleValidate(value);
          },
        });
  }, [children, propsName, value, name, onValueChange, handleValidate]);

  const cls = classNames("ty-ant-form-item", className);

  return (
    <div className={cls} style={style}>
      <div>{label && <label>{label}</label>}</div>
      <div>
        {childEle} {error && <div style={{ color: "red" }}>{error}</div>}
      </div>
    </div>
  );
};
export default memo(TFormItem);
