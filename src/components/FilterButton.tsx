import type { FC, MouseEvent, ReactNode } from "react";

interface FilterButtonProps {
  filter: string;
  isActive?: boolean;
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
  children: ReactNode;
}

const FilterButton: FC<FilterButtonProps> = ({
  filter,
  isActive = false,
  onClick,
  children,
}) => {
  return (
    <a
      href="#"
      className={`btn ${isActive ? "active" : ""}`.trim()}
      data-filter={filter}
      onClick={onClick}
    >
      {children}
    </a>
  );
};

export default FilterButton;
