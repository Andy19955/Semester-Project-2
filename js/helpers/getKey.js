let getKey;

if (window.location.hostname === "localhost") {
  import("../config.js").then(({ LOCAL_API_KEY }) => {
    getKey = () => LOCAL_API_KEY;
  });
} else {
  getKey = async () => {
    const response = await fetch("/.netlify/functions/getKeys");
    if (!response.ok) throw new Error("Failed to fetch API key");
    const data = await response.json();
    return data.apiKey;
  };
}
export { getKey };
