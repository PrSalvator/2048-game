import type { IButtonProps } from "./interface";

const Button = ({ children, isDisabled = false, onClick }: IButtonProps) => {
  return (
    <button type="button" disabled={isDisabled} className="button" onClick={onClick}>
      {children}
    </button>
  );
};

export { Button };
