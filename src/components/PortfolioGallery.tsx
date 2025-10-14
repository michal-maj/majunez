import type { PortfolioSectionData } from "../types/portfolio";
import PortfolioSection from "./PortfolioSection";

interface PortfolioGalleryProps {
  sections?: PortfolioSectionData[];
}

const PortfolioGallery = ({ sections = [] }: PortfolioGalleryProps) => {
  if (sections.length === 0) {
    return (
      <div className="gallery_container empty">
        <p className="portfolio-empty">
          Obecnie brak elementów do wyświetlenia.
        </p>
      </div>
    );
  }

  return (
    <div className="gallery_container">
      {sections.map((section) => (
        <PortfolioSection key={section.id} section={section} />
      ))}
    </div>
  );
};

export default PortfolioGallery;
