import type { PropsWithChildren } from "react";

interface IButtonProps extends PropsWithChildren {
  isDisabled?: boolean;

  onClick?: () => void;
}

export type { IButtonProps };
