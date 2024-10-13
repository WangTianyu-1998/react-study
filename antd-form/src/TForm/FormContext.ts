import { createContext } from "react";

/**
 * FormContextProps
 * 在context里保存values也就是Store的值
 * onValueChange用于value变化
 * validateRegister用于注册校验方法,也就是rules指定的那些
 */

export interface TFormContextProps {
  values?: Record<string, any>;
  setValues?: (values: Record<string, any>) => void;
  onValueChange?: (key: string, value: any) => void;
  validateRegister?: (name: string, cb: Function) => void;
}

export default createContext<TFormContextProps>({});
