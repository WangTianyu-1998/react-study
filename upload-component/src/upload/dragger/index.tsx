import {
  PropsWithChildren,
  useCallback,
  type FC,
  DragEvent,
  useState,
} from "react";
import "./index.scss";
import classNames from "classnames";

interface DraggerProps extends PropsWithChildren {
  onFile: (files: FileList) => void;
}

const Dragger: FC<DraggerProps> = (props) => {
  const { onFile, children } = props;

  const [dargOver, setDragOver] = useState(false);

  const cs = classNames("upload-dragger", {
    "is-dragover": dargOver,
  });

  const handleDrop = useCallback(
    (e: DragEvent<HTMLElement>) => {
      e.preventDefault();
      setDragOver(false);
      onFile(e.dataTransfer.files);
    },
    [onFile]
  );

  const handleDrag = useCallback((e: DragEvent<HTMLElement>, over: boolean) => {
    e.preventDefault();
    setDragOver(over);
  }, []);

  return (
    <div
      className={cs}
      onDragOver={(e) => {
        handleDrag(e, true);
      }}
      onDragLeave={(e) => {
        handleDrag(e, false);
      }}
      onDrop={handleDrop}
    >
      {children}
    </div>
  );
};
export default Dragger;
