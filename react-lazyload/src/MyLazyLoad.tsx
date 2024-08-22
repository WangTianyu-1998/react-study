import {
  CSSProperties,
  FC,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

interface MyLazyLoadProps {
  className?: string;
  style: CSSProperties;
  placeholder: ReactNode;
  offset: number | string;
  width: number | string;
  height: number | string;
  onContentVisible: () => void;
  children: ReactNode;
}

const MyLazyLoad: FC<Partial<MyLazyLoadProps>> = (props) => {
  const {
    className,
    style,
    placeholder,
    offset,
    width,
    height,
    onContentVisible, // 进入可视区域的回调
    children,
  } = props;
  const [visible, setVisible] = useState(false);
  const styles = { height, width, ...style };
  const containerRef = useRef<HTMLDivElement>(null);
  const elementObserver = useRef<IntersectionObserver>();

  const lazyLoadHandler = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      const { isIntersecting } = entry;
      if (isIntersecting) {
        setVisible(true);
        onContentVisible?.();
        const node = containerRef.current;
        if (node && node instanceof HTMLElement) {
          elementObserver.current?.unobserve(node);
        }
      }
    },
    [onContentVisible]
  );

  useEffect(() => {
    const options = {
      rootMargin: typeof offset === 'string' ? offset : `${offset}px`, // 就是距离多少进入可视区域就触发，和参数的 offset 一个含义
      threshold: 0, // 元素进入可视区域多少比例的时候触发，0 就是刚进入可视区域就触发
    };
    elementObserver.current = new IntersectionObserver(
      lazyLoadHandler,
      options
    );
    const node = containerRef.current;
    if (node instanceof HTMLElement) {
      elementObserver.current.observe(node);
    }
    return () => {
      if (node && node instanceof HTMLElement) {
        elementObserver.current?.unobserve(node);
      }
    };
  }, [offset, lazyLoadHandler]);

  return (
    <div ref={containerRef} className={className} style={styles}>
      {visible ? children : placeholder}
    </div>
  );
};
export default MyLazyLoad;
