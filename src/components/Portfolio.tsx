import { useMemo } from "react";

import portfolioData from "../data/portfolioData.json";
import usePortfolioInit from "../hooks/usePortfolioInit";
import type {
  PortfolioData,
  PortfolioItemData,
  PortfolioSectionData,
} from "../types/portfolio";
import { withBasePath } from "../utils/path";
import PortfolioGallery from "./PortfolioGallery";

const Portfolio = () => {
  usePortfolioInit();

  const sections = useMemo<PortfolioSectionData[]>(() => {
    const data = portfolioData as PortfolioData;

    const prefixAsset = (value?: string) =>
      value ? withBasePath(value) : value;

    const normalizeItem = (item: PortfolioItemData) => ({
      ...item,
      thumbnail: prefixAsset(item.thumbnail),
      image: prefixAsset(item.image),
      video: prefixAsset(item.video),
      flash: prefixAsset(item.flash),
    });

    return (data.sections ?? []).map((section) => ({
      ...section,
      items: Array.isArray(section.items)
        ? section.items.map(normalizeItem)
        : [],
    }));
  }, []);

  return (
    <div id="portfolio">
      <div className="container" id="gallery">
        <div className="section_header">
          <h1>
            <i className="icon-folder-open"></i> Grafika
          </h1>
        </div>
        <div className="row">
          <div className="span12">
            <PortfolioGallery sections={sections} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
