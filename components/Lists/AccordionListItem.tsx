"use client";
import React, { useState, useEffect, useRef } from "react";
import { Button } from "athameui";

type AccordionListItemProps = {
  title: string;
  children: React.ReactNode;
  isOpen?: boolean;
  onToggle?: (isOpen: boolean) => void;
  disabled?: boolean;
  addClasses?: {
    content?: string;
    disabled?: string;
    expandedIcon?: string;
    header?: string;
    icon?: string;
    item?: string;
    title?: string;
  };
  ariaLabel?: string;
  dataTestId?: string;
  useAnimation?: boolean;
};

export const AccordionListItem: React.FC<AccordionListItemProps> = ({
  title,
  children,
  isOpen = false,
  disabled = false,
  addClasses = {},
  ariaLabel,
  dataTestId,
  useAnimation = true,
  onToggle,
}) => {
  const [internalOpen, setInternalOpen] = useState(isOpen);
  const [contentHeight, setContentHeight] = useState<number | undefined>(0);
  const isControlled = onToggle !== undefined;
  const isExpanded = isControlled ? isOpen : internalOpen;
  const contentRef = useRef<HTMLDivElement>(null);

  const updateContentHeight = React.useCallback(() => {
    if (useAnimation && contentRef.current) {
      setContentHeight(isExpanded ? contentRef.current.scrollHeight : 0);
    }
  }, [useAnimation, isExpanded]);

  useEffect(() => {
    const timer = setTimeout(updateContentHeight, 0);
    return () => clearTimeout(timer);
  }, [updateContentHeight]);

  useEffect(() => {
    if (!useAnimation || !isExpanded) return;

    const handleResize = () => {
      if (contentRef.current) {
        setContentHeight(contentRef.current.scrollHeight);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [useAnimation, isExpanded]);

  const handleToggle = () => {
    if (disabled) return;

    if (isControlled) {
      onToggle?.(isOpen);
    } else {
      setInternalOpen(!internalOpen);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleToggle();
    }
  };
  return (
    <li
      className={`bn-accordion-item w-full border-b border-primary-200 ${addClasses.item}`}
      data-testid={dataTestId}
    >
      <Button
        className={{
          button: `w-full px-5 py-4 bg-transparent border-0 flex justify-between items-center cursor-pointer text-lg font-medium text-primary-500 text-left transition-colors ease-out hover:bg-tertiary-50 hover:text-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-400 active:scale-100
          ${addClasses.header || ""} 
          ${
            disabled
              ? `opacity-60 cursor-not-allowed ${addClasses.disabled || ""}`
              : ""
          }`,
        }}
        aria-controls={`accordion-content-${dataTestId || "default"}`}
        aria-expanded={isExpanded}
        aria-label={ariaLabel || `Toggle ${title}`}
        disabled={disabled}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        testId={`bn-accordion-header-${dataTestId || "default"}`}
        type="button"
      >
        <>
          <div className={`${addClasses.title}`}>{title}</div>
          <span
            className={`
              bn-accordion-icon text-xs transition-transform duration-300 ease-in-out text-tertiary-300 select-none leading-none
              ${
                isExpanded
                  ? `transform rotate-180 ${addClasses.expandedIcon || ""}`
                  : ""
              }
              ${addClasses.icon || ""}`}
            aria-hidden="true"
          >
            ▼
          </span>
        </>
      </Button>

      <div
        className={`bn-accordion-content-wrapper overflow-hidden bg-primary-100/20 ${
          useAnimation ? "transition-all ease-in-out duration-300" : ""
        }`}
        style={useAnimation ? { height: `${contentHeight}px` } : undefined}
      >
        <div
          ref={contentRef}
          className={`bn-accordion-content py-3.5 pr-1.25 pl-10 text-tertiary-50 ${
            addClasses.content || ""
          }`}
          id={`accordion-content-${dataTestId || "default"}`}
          role="region"
          aria-labelledby={`accordion-header-${dataTestId || "default"}`}
        >
          {children}
        </div>
      </div>
    </li>
  );
};
