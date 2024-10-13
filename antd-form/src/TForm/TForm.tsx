import {
  CSSProperties,
  FormEvent,
  forwardRef,
  memo,
  ReactNode,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import TFormContext from "./FormContext";
import classNames from "classnames";

/**
 * 参数传入初始值initialValues
 * 点击提交的回调 onFinish
 * 点击提交有错误时的回调onFinishFailed
 */
export interface TFormProps extends React.HTMLAttributes<HTMLFormElement> {
  className?: string;
  style?: CSSProperties;
  onFinish?: (values: Record<string, any>) => void;
  onFinishFailed?: (errors: Record<string, any>) => void;
  initialValues?: Record<string, any>;
  children?: ReactNode;
}

export interface TFormRefApi {
  getFilesValue: () => Record<string, any>;
  setFieldsValue: (values: Record<string, any>) => void;
}

const TFrom = forwardRef<TFormRefApi, TFormProps>((props: TFormProps, ref) => {
  const {
    className,
    style,
    children,
    initialValues,
    onFinish,
    onFinishFailed,
    ...others
  } = props;

  // values用于保存表单的值
  const [values, setValues] = useState<Record<string, any>>(
    initialValues || {}
  );
  // 为什么不都用useState?
  // 因为修改state调用setValues会触发重新渲染
  // 而ref的值保存在current属性上,修改它不会触发重新渲染
  // errors\validator这种就是不需要重新触发渲染的数据
  const validatorMap = useRef(new Map<string, Function>());
  const errors = useRef<Record<string, any>>({});

  // onValueChange 的时候就是修改 values 的值。
  const onValueChange = useCallback(
    (key: string, value: any) => {
      setValues((prev) => {
        return {
          ...prev,
          [key]: value,
        };
      });
    },
    [setValues]
  );

  // 提交表单时,遍历validatorMap,对所有的validator对值的校验,如果有错误,调用onFinishFailed回调
  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      for (const [key, callbackFunc] of validatorMap.current) {
        if (typeof callbackFunc === "function") {
          errors.current[key] = callbackFunc(values[key]);
        }
      }
      const errorList = Object.keys(errors.current)
        .map((key) => {
          return errors.current[key];
        })
        .filter(Boolean);
      if (errorList.length) {
        onFinishFailed?.(errors.current);
      } else {
        onFinish?.(values);
      }
    },
    [values, onFinish, onFinishFailed]
  );

  const handleValidateRegister = useCallback(
    (name: string, cb: Function) => {
      validatorMap.current.set(name, cb);
      console.log("🚀 ~ TFrom ~ validatorMap:", validatorMap);
    },
    [validatorMap.current]
  );

  const cls = classNames("ty-ant-form", className);

  useImperativeHandle(
    ref,
    () => {
      return {
        getFilesValue() {
          return values;
        },
        setFieldsValue(values) {
          setValues(values);
        },
      };
    },
    [ref, values]
  );

  return (
    <>
      <TFormContext.Provider
        value={{
          onValueChange,
          values,
          setValues: (v) => setValues(v),
          validateRegister: handleValidateRegister,
        }}
      >
        <form {...others} className={cls} style={style} onSubmit={handleSubmit}>
          {children}
        </form>
      </TFormContext.Provider>
    </>
  );
});

export default memo(TFrom);
