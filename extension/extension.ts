// Somewhere in your implementation code
Number.prototype.formatData = function (): string {
  const num = this.valueOf(); // Get the number value

  if (num < 1100) return num.toString(); // If less than 1K, return as-is
  if (num < 1_000_000) return (num / 1000).toFixed(num % 1000 === 0 ? 0 : 2) + "K"; // 1K - 999K
  if (num < 1_000_000_000) return (num / 1_000_000).toFixed(num % 1_000_000 === 0 ? 0 : 2) + "M"; // 1M - 999M
  return (num / 1_000_000_000).toFixed(num % 1_000_000_000 === 0 ? 0 : 2) + "B"; // 1B+
};

String.prototype.toCurrency = function (): string {
  const value = this as string;

  // ✅ Allow an empty input to return an empty string
  if (value.trim() === "") return "";

  // Remove any characters that are not numbers or a decimal point
  let numericValue = value.replace(/[^0-9.]/g, "");

  // ✅ If there's no valid number, return an empty string
  if (numericValue === "") return "";

  // Ensure there's only one decimal point
  let parts = numericValue.split(".");
  if (parts.length > 2) {
    numericValue = parts[0] + "." + parts.slice(1).join(""); // Remove extra decimals
  }

  // If the input is just a decimal, default to "0."
  if (numericValue === ".") return "$0.";

  // Ensure proper decimal formatting
  let formattedValue = numericValue;

  // If there's a decimal, keep only two digits after it
  if (numericValue.includes(".")) {
    let [whole, decimal] = numericValue.split(".");
    decimal = decimal.slice(0, 2); // Limit to two decimal places
    formattedValue = decimal ? `${whole}.${decimal}` : whole + ".";
  }

  return `$${formattedValue}`;
};
