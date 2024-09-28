import React, { forwardRef } from "react";
import { IconProps } from "./index";
import Icon from "./index";

interface CreateIconOptions {
  content: React.ReactNode;
  iconProps?: IconProps;
  viewBox?: string;
}

/**
 * 将path传入
 * @param options
 * @returns
 */
export function createIcon(options: CreateIconOptions) {
  const { content, iconProps = {}, viewBox = "0 0 1024 1024" } = options;

  return forwardRef<SVGSVGElement, IconProps>((props, ref) => {
    return (
      <Icon ref={ref} viewBox={viewBox} {...iconProps} {...props}>
        {content}
      </Icon>
    );
  });
}
