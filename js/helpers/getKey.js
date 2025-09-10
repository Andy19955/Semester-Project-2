export async function getKey() {
  const response = await fetch("/.netlify/functions/getKeys");
  const data = await response.json();
  return data.apiKey;
}
