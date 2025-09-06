/**
 * Starts a dynamic countdown timer for an auction end date.
 *
 * Expects an element with id 'end-date-countdown' and a valid ISO datetime in its 'datetime' attribute.
 * Updates the element's text content every second to show time remaining (e.g., "2d 3h 15m 10s").
 * Displays "Auction ended" when the time is up, or "Invalid end date" if the date is not valid.
 */
export function countdown() {
  const countdownElement = document.querySelector("#end-date-countdown");

  function updateCountdown() {
    const endTimeStr = countdownElement.getAttribute("datetime");
    if (!endTimeStr) return;
    const endTime = new Date(endTimeStr);
    const now = new Date();
    const diff = endTime - now;

    if (isNaN(endTime.getTime())) {
      countdownElement.textContent = "Invalid end date";
      return;
    }
    if (diff <= 0) {
      countdownElement.textContent = "Auction ended";
      return;
    }
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
    let parts = [];
    if (days > 0) parts.push(days + "d");
    if (hours > 0 || days > 0) parts.push(hours + "h");
    if (minutes > 0 || hours > 0 || days > 0) parts.push(minutes + "m");
    parts.push(seconds + "s");
    countdownElement.textContent = parts.join(" ");
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
}
