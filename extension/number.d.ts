// extension/number.d.ts
declare global {
  interface Number {
    formatData(): string;
  }
}

export {}; // This ensures the file is treated as a module
