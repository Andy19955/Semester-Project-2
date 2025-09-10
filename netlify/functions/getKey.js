export async function getKey() {
  const apiKey = process.env.api_key;
  return apiKey;
}
