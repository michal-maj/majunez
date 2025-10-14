import type { FC, MouseEvent } from "react";

import { type FilterLink, type NavLink } from "../../types/navigation";
import FilterNav from "./FilterNav";
import MainNav from "./MainNav";

interface LayoutHeaderProps {
  navLinks: NavLink[];
  filters: FilterLink[];
  onNavigate?: (path: string) => void;
}

const LayoutHeader: FC<LayoutHeaderProps> = ({
  navLinks,
  filters,
  onNavigate,
}) => {
  const handleBrandClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    onNavigate?.("/start");
  };

  return (
    <div className="navbar navbar-fixed-top">
      <div className="navbar-inner">
        <div className="container">
          <a className="brand" href="/start" onClick={handleBrandClick}>
            <div className="brand-logo">
              <img src="/img/logo.png" alt="Majunez - Michał Maj Portfolio" />
            </div>
            <h1 className="brand-txt">Majunez.pl Michał Maj Portfolio</h1>
          </a>
          <div id="navs">
            <MainNav links={navLinks} onNavigate={onNavigate} />
            <FilterNav filters={filters} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LayoutHeader;
