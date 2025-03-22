declare global {
  interface String {
    toCurrency(): string;
    timeAgo(): string;
  }
}
export {};