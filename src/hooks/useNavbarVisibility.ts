import { useEffect } from "react";

const NAV_CLASSNAMES = ["hide_filters", "remove_filters", "show_nav"] as const;

const getActiveHref = (pathname: string) => {
  if (pathname === "/" || pathname === "/start") {
    return "/start";
  }

  return pathname;
};

const useNavbarVisibility = (pathname: string) => {
  useEffect(() => {
    const $ = window.$;

    if (!$) {
      return;
    }

    const $navbar = $(".navbar-inner");
    const isPortfolioPage = pathname === "/portfolio";

    if (isPortfolioPage) {
      NAV_CLASSNAMES.forEach((className) => $navbar.removeClass(className));
    } else {
      NAV_CLASSNAMES.forEach((className) => $navbar.addClass(className));
    }

    const $navLinks = $(".nav1 a");
    $navLinks.removeClass("urlactive");

    const href = getActiveHref(pathname);
    $(`.nav1 a[href="${href}"]`).addClass("urlactive");
  }, [pathname]);
};

export default useNavbarVisibility;
