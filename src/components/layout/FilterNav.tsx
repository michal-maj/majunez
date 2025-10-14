import type { FC } from "react";

import type { FilterLink } from "../../types/navigation";

interface FilterNavProps {
  filters: FilterLink[];
}

const FilterNav: FC<FilterNavProps> = ({ filters }) => {
  if (filters.length === 0) {
    return null;
  }

  return (
    <ul className="nav filters">
      {filters.map(({ id, filter, label, className }) => (
        <li key={id}>
          <a href="#" data-filter={filter} className={className}>
            {label}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default FilterNav;
