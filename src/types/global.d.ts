export {};

declare global {
  interface Window {
    $?: any;
    scrollHandler?: (event?: Event) => void;
  }
}
