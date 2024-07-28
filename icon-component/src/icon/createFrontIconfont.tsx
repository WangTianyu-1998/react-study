// 支持iconfont的图标

import { forwardRef } from "react";
import { Icon, IconProps } from ".";

/**
 * createFrontIconfont 会传入scriptUrl, 我们在document.body上添加<script>标签引入它.
 * 当然,如果加载过的就不用再次加载了,所以用set来记录下.
 * 然后用的时候使用 <use xlinkHref="#type"> 引用.
 * antd的就是这么做的
 */

const loadedSet = new Set<string>();

/**
 * 支持iconfont
 * @param scriptUrl
 * @returns
 */
export function createFrontIconfont(scriptUrl: string) {
  if (
    typeof scriptUrl === "string" &&
    scriptUrl.length &&
    !loadedSet.has(scriptUrl)
  ) {
    const script = document.createElement("script");
    script.setAttribute("src", scriptUrl);
    script.setAttribute("data-namespace", scriptUrl);
    document.body.appendChild(script);

    loadedSet.add(scriptUrl);
  }

  const Iconfont = forwardRef<SVGSVGElement, IconProps>((props, ref) => {
    const { type, ...rest } = props;

    return (
      <Icon {...rest} ref={ref}>
        {type ? <use xlinkHref={`#${type}`}></use> : null}
      </Icon>
    );
  });

  return Iconfont;
}
