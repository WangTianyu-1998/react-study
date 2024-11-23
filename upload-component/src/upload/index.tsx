import {
  ChangeEvent,
  PropsWithChildren,
  useCallback,
  useRef,
  useState,
  type FC,
} from "react";
import axios from "axios";
import "./index.scss";
import UploadList, { UploadFile } from "./upload-list";
import Dragger from "./dragger";

export interface UploadProps extends PropsWithChildren {
  action: string;
  headers?: Record<string, string>;
  name?: string;
  data?: Record<string, any>;
  withCredentials?: boolean;
  accept?: string;
  multiple?: boolean;
  beforeUpload?: (file: File) => boolean | Promise<File>;
  onProgress?: (percentage: number, file: File) => void;
  onSuccess?: (data: any, file: File) => void;
  onError?: (err: any, file: File) => void;
  onChange?: (file: File) => void;
  onRemove?: (file: UploadFile) => void;
  drag?: boolean;
}

export const Upload: FC<UploadProps> = (props) => {
  const {
    action,
    name,
    headers,
    data, // data 是携带的数据
    withCredentials,
    accept,
    multiple,
    children,
    beforeUpload,
    onProgress,
    onSuccess,
    onError,
    onChange,
    onRemove,
    drag,
  } = props;

  const fileInput = useRef<HTMLInputElement>(null);

  const [fileList, setFileList] = useState<Array<UploadFile>>([]);

  const updateFileList = useCallback(
    (updateFile: UploadFile, updateObj: Partial<UploadFile>) => {
      setFileList((prevList) => {
        return prevList.map((file) => {
          if (file.uid === updateFile.uid) {
            return { ...file, ...updateObj };
          }
          return file;
        });
      });
    },
    []
  );

  // const fileList: UploadFile[] = [
  //   {
  //     uid: "11",
  //     size: 111,
  //     name: "xxxx",
  //     status: "uploading",
  //     percent: 50,
  //   },
  //   {
  //     uid: "22",
  //     size: 111,
  //     name: "yyy",
  //     status: "success",
  //     percent: 50,
  //   },
  //   {
  //     uid: "33",
  //     size: 111,
  //     name: "zzz",
  //     status: "error",
  //     percent: 50,
  //   },
  // ];
  const post = useCallback(
    (file: File) => {
      const uploadFile: UploadFile = {
        uid: Date.now() + "upload-file",
        status: "ready",
        name: file.name,
        size: file.size,
        percent: 0,
        raw: file,
      };
      setFileList((prevList) => {
        return [uploadFile, ...prevList];
      });

      const formData = new FormData();
      formData.append(name || "file", file);
      if (data) {
        Object.keys(data).forEach((key) => {
          formData.append(key, data[key]);
        });
      }

      axios
        .post(action, formData, {
          headers: {
            ...headers,
            "Content-Type": "multipart/form-data",
          },
          // 是否携带 cookie
          withCredentials,
          onUploadProgress: (e) => {
            const percentage = Math.round((e.loaded * 100) / e.total!) || 0;
            if (percentage < 100) {
              updateFileList(uploadFile, {
                percent: percentage,
                status: "uploading",
              });
              if (onProgress) {
                onProgress(percentage, file);
              }
            }
          },
        })
        .then((res) => {
          updateFileList(uploadFile, { status: "success", response: res.data });
          onSuccess?.(res.data, file);
          onChange?.(file);
        })
        .catch((err) => {
          updateFileList(uploadFile, { status: "error", error: err });
          onError?.(err, file);
          onChange?.(file);
        });
    },
    [
      action,
      data,
      headers,
      name,
      onChange,
      onError,
      onProgress,
      onSuccess,
      updateFileList,
      withCredentials,
    ]
  );

  const uploadFiles = useCallback(
    (files: FileList) => {
      const formData = Array.from(files);
      formData.forEach((file) => {
        if (!beforeUpload) {
          post(file);
        } else {
          const result = beforeUpload(file);
          if (result && result instanceof Promise) {
            result.then((processedFile) => {
              post(processedFile);
            });
          } else if (result !== false) {
            post(file);
          }
        }
      });
    },
    [beforeUpload, post]
  );

  const handleRemove = useCallback(
    (file: UploadFile) => {
      setFileList((prevList) => {
        return prevList.filter((item) => item.uid !== file.uid);
      });
      if (onRemove) {
        onRemove(file);
      }
    },
    [onRemove]
  );

  const handleClick = useCallback(() => {
    if (fileInput.current) {
      fileInput.current.click();
    }
  }, []);

  const handleFileChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (!files) {
        return;
      }
      uploadFiles(files);
      if (fileInput.current) {
        fileInput.current.value = "";
      }
    },
    [uploadFiles]
  );

  console.log(drag, "@@drag");

  return (
    <div className="upload-component">
      <div className="upload-input" onClick={handleClick}>
        {drag ? (
          <>
            <Dragger onFile={(files) => uploadFiles(files)}>{children}</Dragger>
          </>
        ) : (
          children
        )}
        <input
          type="file"
          className="upload-file-input"
          ref={fileInput}
          onChange={handleFileChange}
          accept={accept}
          multiple={multiple}
        />
      </div>
      <UploadList fileList={fileList} onRemove={handleRemove} />
    </div>
  );
};
