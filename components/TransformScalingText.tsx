"use client";
import React, { useRef, useEffect, useState } from "react";

type TransformScalingTextProps = {
  children: React.ReactNode;
  className?: string;
  animationDuration?: number; // in milliseconds
};

export const TransformScalingText: React.FC<TransformScalingTextProps> = ({
  children,
  className = "",
  animationDuration = 300,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const calculateScale = () => {
      if (!containerRef.current || !textRef.current) return;

      const container = containerRef.current;
      const text = textRef.current;

      // Reset scale to measure natural size
      text.style.transform = "scale(1)";

      const containerWidth = container.clientWidth;
      const containerHeight = container.clientHeight;
      const textWidth = text.scrollWidth;
      const textHeight = text.scrollHeight;

      // Calculate scale to fit both width and height
      const scaleX = containerWidth / textWidth;
      const scaleY = containerHeight / textHeight;
      const newScale = Math.min(scaleX, scaleY, 1); // Don't scale up beyond 1

      setScale(newScale);
    };

    calculateScale();

    const resizeObserver = new ResizeObserver(calculateScale);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => resizeObserver.disconnect();
  }, [children]);

  return (
    <div
      ref={containerRef}
      className={`overflow-hidden flex items-center justify-center ${className}`}
      style={{ width: "100%", height: "100%" }}
    >
      <div
        ref={textRef}
        className="whitespace-nowrap origin-center"
        style={{
          transform: `scale(${scale})`,
          transition: `transform ${animationDuration}ms ease-in-out`,
        }}
      >
        {children}
      </div>
    </div>
  );
};
