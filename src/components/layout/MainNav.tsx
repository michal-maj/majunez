import type { FC, MouseEvent } from "react";

import type { NavLink } from "../../types/navigation";

interface MainNavProps {
  links: NavLink[];
  onNavigate?: (path: string) => void;
}

const MainNav: FC<MainNavProps> = ({ links, onNavigate }) => {
  if (links.length === 0) {
    return null;
  }

  const handleClick = (event: MouseEvent<HTMLAnchorElement>, path: string) => {
    event.preventDefault();
    onNavigate?.(path);
  };

  return (
    <ul className="nav nav1">
      {links.map(({ path, label, icon }) => (
        <li key={path}>
          <a href={path} onClick={(event) => handleClick(event, path)}>
            {icon && <i className={icon}></i>} {label}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default MainNav;
