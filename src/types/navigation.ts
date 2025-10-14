export interface NavLink {
  path: string;
  label: string;
  icon?: string;
}

export interface FilterLink {
  id: string;
  filter: string;
  label: string;
  className?: string;
}
