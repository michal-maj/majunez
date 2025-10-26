const normalizeBase = (base: string) => {
  if (!base) {
    return "/";
  }

  return base.endsWith("/") ? base : `${base}/`;
};

const normalizePath = (path: string) => path.replace(/^\/+/, "");

const shouldPrefix = (path: string) => {
  if (!path) {
    return false;
  }

  if (path.startsWith("//")) {
    return false;
  }

  const lowerPath = path.toLowerCase();

  return path.startsWith("/") &&
    !lowerPath.startsWith("http://") &&
    !lowerPath.startsWith("https://") &&
    !lowerPath.startsWith("mailto:") &&
    !lowerPath.startsWith("tel:") &&
    !lowerPath.startsWith("data:") &&
    !lowerPath.startsWith("#");
};

export const withBasePath = (path: string) => {
  if (!shouldPrefix(path)) {
    return path;
  }

  const base = normalizeBase(import.meta.env.BASE_URL ?? "/");
  const cleanPath = normalizePath(path);

  return `${base}${cleanPath}`;
};
