import { useMemo } from "react";

import portfolioData from "../data/portfolioData.json";
import usePortfolioInit from "../hooks/usePortfolioInit";
import type { PortfolioData, PortfolioSectionData } from "../types/portfolio";
import PortfolioGallery from "./PortfolioGallery";

const Portfolio = () => {
  usePortfolioInit();

  const sections = useMemo<PortfolioSectionData[]>(() => {
    const data = portfolioData as PortfolioData;

    return (data.sections ?? []).map((section) => ({
      ...section,
      items: Array.isArray(section.items) ? section.items : [],
    }));
  }, []);

  return (
    <div id="portfolio">
      <div className="container" id="gallery">
        <div className="section_header">
          <h1>
            <i className="icon-folder-open"></i> Portfolio
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
