export interface PortfolioItemData {
  id?: string;
  title: string;
  thumbnail?: string;
  image?: string;
  video?: string;
  flash?: string;
  description?: string;
  details?: string;
  link?: string;
  hasVideo?: boolean;
  hasDetails?: boolean;
  [key: string]: unknown;
}

export interface PortfolioSectionData {
  id: string;
  title: string;
  items?: PortfolioItemData[];
}

export interface PortfolioData {
  sections?: PortfolioSectionData[];
}
