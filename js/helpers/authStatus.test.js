import { expect, describe, it, beforeEach } from "vitest";
import { isLoggedIn } from "./authStatus.js";

describe("isLoggedIn", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("should return false when no token exists", () => {
    const result = isLoggedIn();
    expect(result).toBe(false);
  });

  it("should return false when token is empty string", () => {
    localStorage.setItem("token", "");
    const result = isLoggedIn();
    expect(result).toBe(false);
  });

  it("should return true when valid token exists", () => {
    localStorage.setItem("token", "valid-token-123");
    const result = isLoggedIn();
    expect(result).toBe(true);
  });

  it("should return true for any non-empty token string", () => {
    localStorage.setItem("token", "any-token");
    const result = isLoggedIn();
    expect(result).toBe(true);
  });
});
