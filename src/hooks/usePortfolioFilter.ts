import { useCallback, useState } from "react";
import type { MouseEvent } from "react";

const normalizeFilter = (filter: string) => {
  if (filter === "*") {
    return "*";
  }

  return filter.startsWith(".") ? filter : `.${filter}`;
};

const usePortfolioFilter = () => {
  const [activeFilter, setActiveFilter] = useState<string>("*");

  const handleFilterChange = useCallback(
    (filter: string, event: MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();
      setActiveFilter(filter);

      const $ = window.$;
      const normalizedFilter = normalizeFilter(filter);

      if ($?.fn?.isotope) {
        const $container = $(".gallery_container");

        if ($container.length) {
          ($container as any).isotope({ filter: normalizedFilter });
        }

        $("html, body").animate({ scrollTop: 0 }, "fast");
      }

      return false;
    },
    []
  );

  return {
    activeFilter,
    handleFilterChange,
  };
};

export default usePortfolioFilter;
