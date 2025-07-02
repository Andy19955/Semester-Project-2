let throttleTimer;
/**
 * Throttles the execution of a callback function to limit the rate at which it can be invoked.
 *
 * @param {Function} callback - The function to throttle.
 * @param {number} time - The time in milliseconds to wait before allowing the next invocation.
 *
 * @example
 * window.addEventListener("scroll", () => {
 *   throttle(() => {
 *     console.log("Throttled scroll event");
 *   }, 1000);
 * });
 */
export const throttle = (callback, time) => {
  if (throttleTimer) return;

  throttleTimer = true;

  setTimeout(() => {
    callback();
    throttleTimer = false;
  }, time);
};
