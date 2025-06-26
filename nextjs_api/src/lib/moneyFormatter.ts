export function formatMoney(milliunits: number): string {
  const str = milliunits.toString().padStart(4, "0");
  const decimal = str.slice(0, -3) + "." + str.slice(-3, -1);

  return parseFloat(decimal).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
}
