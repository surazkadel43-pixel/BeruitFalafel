declare global {
  interface String {
    toCurrency(): string;
    timeAgo(): { text: string; isFuture: boolean };
  }
}
export {};