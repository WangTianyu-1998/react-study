type Props = {
  title?: string;
  postData?: any;
  skipValue?: boolean;
};

export const useChangeStatusCallbackFn = (
  confirmCallbackFunc?: (res?: any) => void,
  cancelCallbackFunc?: (res?: any) => void
) => {
  return (props: Props) => {
    const { title = "这是一个弹窗", postData, skipValue = false } = props;
    const res = confirm(title);

    if (res) {
      skipValue ? confirmCallbackFunc?.(postData) : confirmCallbackFunc?.();
    } else {
      cancelCallbackFunc?.(res);
    }
    if (skipValue) {
    }
  };
};
