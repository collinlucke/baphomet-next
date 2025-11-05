"use client";
// Leaving a lot commented out as this is a translation from a separate component library
// and may be useful later for theming or CSS-in-JS approaches
import {
  MouseEventHandler,
  ReactElement,
  forwardRef,
  KeyboardEventHandler,
} from "react";

type ButtonProps = {
  children?: ReactElement | string;
  addClasses: {
    button?: string;
    disabled?: string;
    primary?: string;
    secondary?: string;
    tertiary?: string;
    ghost?: string;
    ghostOnDark?: string;
    outline?: string;
  };
  type?: HTMLButtonElement["type"];
  variant?:
    | "primary"
    | "secondary"
    | "tertiary"
    | "ghost"
    | "ghostOnDark"
    | "outline";
  size?: "small" | "medium" | "large";
  iconOnly?: boolean;
  icon?: ReactElement | string;
  ariaLabel?: string;
  ariaDescribedBy?: string;
  ariaExpanded?: boolean;
  ariaHaspopup?:
    | boolean
    | "false"
    | "true"
    | "menu"
    | "listbox"
    | "tree"
    | "grid"
    | "dialog";
  ariaPressed?: boolean;
  role?: string;
  disabled?: boolean;
  autoFocus?: boolean;
  tabIndex?: number;
  testId?: string;

  onClick?: MouseEventHandler<HTMLButtonElement>;
  onKeyDown?: KeyboardEventHandler<HTMLButtonElement>;
  onFocus?: (event: React.FocusEvent<HTMLButtonElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLButtonElement>) => void;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      addClasses = {},
      type,
      variant = "primary",
      size = "large",
      icon,
      iconOnly,
      ariaLabel,
      ariaDescribedBy,
      ariaExpanded,
      ariaHaspopup,
      ariaPressed,
      role,
      disabled = false,
      autoFocus = false,
      tabIndex,
      testId,

      onClick,
      onKeyDown,
      onFocus,
      onBlur,
    },
    ref
  ) => {
    const sizeMap = {
      small: "py-0.5 px-4",
      medium: "py-2 px-4",
      large: "py-3 px-6",
    };
    const variantMap = {
      primary: `bg-primary-500 text-tertiary-50 hover:bg-primary-600 ${
        addClasses.primary || ""
      }`,
      secondary: `bg-secondary-500 text-tertiary-50 hover:bg-secondary-600 ${
        addClasses.secondary || ""
      }`,
      tertiary: `bg-tertiary-500 text-primary-900 hover:bg-tertiary-600 ${
        addClasses.tertiary || ""
      }`,
      ghost: `bg-transparent text-tertiary-50 hover:text-tertiary-300 ${
        addClasses.ghost || ""
      }`,
      ghostOnDark: `bg-transparent border border-tertiary-50 text-tertiary-50 hover:bg-tertiary-50 hover:text-primary-900 ${
        addClasses.ghostOnDark || ""
      }`,
      outline: `bg-transparent border border-tertiary-500 text-tertiary-500 hover:bg-secondary-500 hover:text-tertiary-50 ${
        addClasses.outline || ""
      }`,
    };
    const baseStyles = `font-light py-2 px-4 rounded-sm cursor-pointer tracking-[.75px] transition-colors leading-none active:scale-95`;
    const disabledStyles = disabled
      ? `opacity-50 cursor-not-allowed pointer-events-none ${
          addClasses.disabled || ""
        }`
      : "";

    const onClickHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
      onClick?.(e);
    };

    // Generate aria-label for icon-only buttons if not provided
    const effectiveAriaLabel =
      ariaLabel || (iconOnly && !children ? `${icon} Button` : undefined);
    return (
      <button
        ref={ref}
        type={type}
        onClick={onClickHandler}
        onKeyDown={onKeyDown}
        onFocus={onFocus}
        onBlur={onBlur}
        disabled={disabled}
        autoFocus={autoFocus}
        tabIndex={disabled ? -1 : tabIndex}
        role={role}
        data-testid={testId}
        className={`
          ${baseStyles}
          ${variantMap[variant]}
          ${sizeMap[size]}
          ${disabledStyles}
          ${addClasses.button || ""}
        `}
        aria-label={effectiveAriaLabel}
        aria-describedby={ariaDescribedBy}
        aria-expanded={ariaExpanded}
        aria-haspopup={ariaHaspopup}
        aria-pressed={ariaPressed}
      >
        {icon ? (
          <>
            {typeof icon === "string" ? (
              <span aria-hidden="true">{icon}</span>
            ) : (
              icon
            )}
            {children}
          </>
        ) : (
          <>{children}</>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
