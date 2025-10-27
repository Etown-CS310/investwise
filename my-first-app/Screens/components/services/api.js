export async function fetchMarketPrices() {
  const res = await fetch(
    "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd"
  );
  if (!res.ok) throw new Error("Failed to fetch prices");
  return res.json();
}
