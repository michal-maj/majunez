import type { PortfolioSectionData } from "../types/portfolio";
import PortfolioItem from "./PortfolioItem";

interface PortfolioSectionProps {
  section: PortfolioSectionData;
}

const PortfolioSection = ({ section }: PortfolioSectionProps) => {
  const { id, title, items = [] } = section;

  return (
    <>
      <PortfolioItem key={`${id}-title`} item={{ title }} category={id} />
      {items.map((item) => (
        <PortfolioItem
          key={item.id ?? `${id}-${item.title}`}
          item={item}
          category={id}
        />
      ))}
    </>
  );
};

export default PortfolioSection;
