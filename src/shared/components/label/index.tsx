import clsx from "clsx";
import type { ILabelProps } from "./interface";

const Label = ({ value, text, type = "blue" }: ILabelProps) => {
  return (
    <div className={clsx("label", `label_${type}`)}>
      <div className="label__text">{text}</div>
      <div className="label__value">{value}</div>
    </div>
  );
};

export { Label };
