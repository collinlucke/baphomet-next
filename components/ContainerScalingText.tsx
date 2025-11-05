"use client";
import React, { useRef, useEffect, useState } from "react";

type ContainerScalingTextProps = {
  children: React.ReactNode;
  maxFontSize?: number;
  minFontSize?: number;
  className?: string;
};

export const ContainerScalingText: React.FC<ContainerScalingTextProps> = ({
  children,
  maxFontSize = 48,
  minFontSize = 14,
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [fontSize, setFontSize] = useState(maxFontSize);

  useEffect(() => {
    const resizeText = () => {
      if (!containerRef.current || !textRef.current) return;

      const container = containerRef.current;
      const text = textRef.current;

      let currentSize = maxFontSize;
      text.style.fontSize = `${currentSize}px`;

      while (
        (text.scrollWidth > container.clientWidth ||
          text.scrollHeight > container.clientHeight) &&
        currentSize > minFontSize
      ) {
        currentSize -= 1;
        text.style.fontSize = `${currentSize}px`;
      }

      setFontSize(currentSize);
    };

    resizeText();

    const resizeObserver = new ResizeObserver(resizeText);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => resizeObserver.disconnect();
  }, [children, maxFontSize, minFontSize]);

  return (
    <div
      ref={containerRef}
      className={`overflow-hidden ${className}`}
      style={{ width: "100%", height: "100%" }}
    >
      <div
        ref={textRef}
        className="whitespace-pre-line"
        style={{ fontSize: `${fontSize}px` }}
      >
        {children}
      </div>
    </div>
  );
};

// Usage:
// <div className="w-64 h-16 border">
//   <ContainerScalingText maxFontSize={32} minFontSize={10}>
//     This text scales to fit its container!
//   </ContainerScalingText>
// </div>
