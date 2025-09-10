// eslint-disable-next-line no-unused-vars
export async function handler(event, context) {
  const apiKey = process.env.api_key;
  return {
    statusCode: 200,
    body: JSON.stringify({ apiKey }),
  };
}
