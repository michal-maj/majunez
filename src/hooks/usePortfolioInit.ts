import { useEffect } from "react";

interface PortfolioInitOptions {
  gallerySelector?: string;
  filterSelector?: string;
  itemSelector?: string;
}

const DEFAULT_GALLERY_SELECTOR = ".gallery_container";
const DEFAULT_FILTER_SELECTOR = ".filters a";
const DEFAULT_ITEM_SELECTOR = ".photo";

const usePortfolioInit = ({
  gallerySelector = DEFAULT_GALLERY_SELECTOR,
  filterSelector = DEFAULT_FILTER_SELECTOR,
  itemSelector = DEFAULT_ITEM_SELECTOR,
}: PortfolioInitOptions = {}) => {
  useEffect(() => {
    const initializeIsotope = ($container: any) => {
      const $ = window.$;

      if ($?.fn?.imagesLoaded && $?.fn?.isotope && $container.length) {
        $container.imagesLoaded(() => {
          ($container as any).isotope({
            itemSelector,
            layoutMode: "masonry",
            animationEngine: "css",
            animationOptions: {
              duration: 800,
              easing: "linear",
              queue: false,
            },
            masonry: {
              columnWidth: 72,
            },
          });
        });
      }
    };

    const initializeFancyBox = () => {
      const $ = window.$;

      if (!$?.fancybox) {
        return;
      }

      $(".portfolio_gallery")
        .attr("rel", "media-gallery")
        .fancybox({
          helpers: {
            media: {},
            buttons: {},
          },
        });
    };

    const bindFilters = ($container: any) => {
      const $ = window.$;

      if (!$) {
        return;
      }

      const $filters = $(filterSelector);

      if (!$filters.length) {
        return;
      }

      $filters
        .off("click.portfolio")
        .on("click.portfolio", function (this: HTMLElement, event: Event) {
          event.preventDefault();

          const $clicked = $(this);
          const selector = $clicked.data("filter");

          $filters.removeClass("active");
          $clicked.addClass("active");

          if ($container.length && $?.fn?.isotope) {
            ($container as any).isotope({ filter: selector });
          }

          $("html, body").animate({ scrollTop: 0 }, "fast");

          return false;
        });
    };

    const initPortfolio = () => {
      const $ = window.$;

      if (!$) {
        return;
      }

      const timeoutId = window.setTimeout(() => {
        const $container = $(gallerySelector);

        initializeIsotope($container);
        initializeFancyBox();
        bindFilters($container);
      }, 200);

      return timeoutId;
    };

    const timeoutId = initPortfolio();

    return () => {
      if (timeoutId !== undefined) {
        window.clearTimeout(timeoutId);
      }

      const $ = window.$;

      if ($?.fancybox?.close) {
        $.fancybox.close();
      }

      if ($) {
        $(filterSelector).off("click.portfolio");
      }
    };
  }, [gallerySelector, filterSelector, itemSelector]);
};

export default usePortfolioInit;
