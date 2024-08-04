import React, {
  CSSProperties,
  FC,
  PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { useWatermark } from "./useWatermark";

export interface WatermarkProps extends PropsWithChildren {
  style?: CSSProperties;
  className?: string;
  width?: number;
  height?: number;
  rotate?: number;
  image?: string;
  content?: string | string[]; // 水印文字内容
  fontStyle?: {
    color?: string;
    fontFamily?: string;
    fontSize?: string;
    fontWeight?: string;
  };
  gap?: [number, number]; // 水印之间的间距
  zIndex?: string | number;
  offset?: [number, number];
  getContainer?: () => HTMLElement; // 水印挂载的容器
}

const Watermark: FC<WatermarkProps> = (props: WatermarkProps) => {
  const {
    style,
    className,
    width,
    height,
    rotate,
    image,
    content,
    fontStyle,
    gap,
    offset,
    zIndex,
  } = props;
  const containerRef = useRef<HTMLDivElement>(null);

  const getContainer = useCallback(() => {
    return props.getContainer ? props.getContainer() : containerRef.current!;
  }, [props, containerRef]);

  const { generateWatermark } = useWatermark({
    zIndex,
    width,
    height,
    rotate,
    image,
    content,
    fontStyle,
    gap,
    offset,
    getContainer,
  });

  useEffect(() => {
    generateWatermark({
      zIndex,
      width,
      height,
      rotate,
      image,
      content,
      fontStyle,
      gap,
      offset,
      getContainer,
    });
  }, [
    generateWatermark,
    content,
    fontStyle,
    gap,
    getContainer,
    height,
    image,
    offset,
    rotate,
    width,
    zIndex,
  ]);

  return props.children ? (
    <div className={className} style={style} ref={containerRef}>
      {props.children}
    </div>
  ) : null;
};
export default Watermark;
