export async function getKey() {
  const response = await fetch("/.netlify/functions/getKeys.js");
  const data = await response.json();
  return data.apiKey;
}
