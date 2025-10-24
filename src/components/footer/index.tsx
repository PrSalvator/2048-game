import { Icon } from "../../shared/components/icon";

const Footer = () => {
  return (
    <div className="footer">
      Copyright © 2025 Kirill Leonov{" "}
      <div className="footer__icons">
        <Icon type="git" />
        <Icon type="figma" />
      </div>
    </div>
  );
};

export { Footer };
