"use client";
import React from "react";

type ScalingTextProps = {
  children: React.ReactNode;
  minSize?: number; // in rem
  maxSize?: number; // in rem
  preferredSize?: number; // in vw (viewport width)
  className?: string;
};

export const ScalingText: React.FC<ScalingTextProps> = ({
  children,
  minSize = 1,
  maxSize = 4,
  preferredSize = 2,
  className = "",
}) => {
  return (
    <div
      className={`${className}`}
      style={{
        fontSize: `clamp(${minSize}rem, ${preferredSize}vw, ${maxSize}rem)`,
      }}
    >
      {children}
    </div>
  );
};
