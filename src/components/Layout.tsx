import type { PropsWithChildren } from "react";
import { useMemo } from "react";
import { useLocation } from "react-router-dom";

import { type FilterLink, type NavLink } from "../types/navigation";
import useNavbarVisibility from "../hooks/useNavbarVisibility";
import useNavigationTransition from "../hooks/useNavigationTransition";
import LayoutFooter from "./layout/LayoutFooter";
import LayoutHeader from "./layout/LayoutHeader";

const NAV_LINKS: NavLink[] = [
  { path: "/start", label: "START", icon: "icon-play-sign" },
  { path: "/portfolio", label: "PORTFOLIO", icon: "icon-folder-open" },
  { path: "/omnie", label: "O MNIE", icon: "icon-user" },
  //   { path: "/kontakt", label: "KONTAKT", icon: "icon-envelope-alt" },
];

const FILTER_LINKS: FilterLink[] = [
  { id: "all", filter: "*", label: "WSZYSTKO", className: "all" },
  {
    id: "visualisation",
    filter: ".visualisation",
    label: "WIZUALIZACJE",
    className: "visualisation active",
  },
  {
    id: "animation",
    filter: ".animation",
    label: "ANIMACJE",
    className: "animation",
  },
  {
    id: "logotype",
    filter: ".logotype",
    label: "LOGOTYPY",
    className: "logotype",
  },
  { id: "print", filter: ".print", label: "POLIGRAFIA", className: "print" },
  { id: "web", filter: ".web", label: "INTERNET", className: "web" },
];

const Layout = ({ children }: PropsWithChildren) => {
  const location = useLocation();
  const handleNavigation = useNavigationTransition();

  useNavbarVisibility(location.pathname);

  const navLinks = useMemo(() => NAV_LINKS, []);
  const filters = useMemo(() => FILTER_LINKS, []);

  return (
    <div id="wrap">
      <LayoutHeader
        navLinks={navLinks}
        filters={filters}
        onNavigate={handleNavigation}
      />

      <div id="preloader"></div>
      <div id="content">
        <div id="content0">{children}</div>
      </div>

      <LayoutFooter onNavigate={handleNavigation} />
    </div>
  );
};

export default Layout;
