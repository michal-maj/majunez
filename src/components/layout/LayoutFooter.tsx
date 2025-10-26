import type { FC, MouseEvent } from "react";

import { withBasePath } from "../../utils/path";

interface LayoutFooterProps {
  onNavigate?: (path: string) => void;
}

const LayoutFooter: FC<LayoutFooterProps> = ({ onNavigate }) => {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>, path: string) => {
    event.preventDefault();
    onNavigate?.(path);
  };

  return (
    <footer id="footer">
      <div>
        <a
          href={withBasePath("/portfolio")}
          onClick={(event) => handleClick(event, "/portfolio")}
        >
          <h3>
            <i className="icon-folder-open"></i> Zobacz Portfolio
          </h3>
        </a>
        <a
          href={withBasePath("/omnie")}
          onClick={(event) => handleClick(event, "/omnie")}
        >
          <h3>
            <i className="icon-user"></i> Sprawdź Info
          </h3>
        </a>
      </div>
      © Majunez 2013
      <img src={withBasePath("/img/majunez_logo.png")} alt="Majunez" />
    </footer>
  );
};

export default LayoutFooter;
