import { expect, describe, it, beforeEach } from "vitest";
import { getQueryParam } from "./getQueryParam.js";

describe("getQueryParam", () => {
  beforeEach(() => {
    window.history.replaceState({}, "", "/");
  });

  it("should return null when parameter doesn't exist in empty search", () => {
    const result = getQueryParam("nonexistent");
    expect(result).toBe(null);
  });

  it("should handle empty parameter name", () => {
    const result = getQueryParam("");
    expect(result).toBe(null);
  });

  it("should return correct value for existing parameter", () => {
    window.history.replaceState({}, "", "/?id=123");
    const result = getQueryParam("id");
    expect(result).toBe("123");
  });

  it("should return correct value from multiple parameters", () => {
    window.history.replaceState({}, "", "/?id=123&name=john&age=25");
    expect(getQueryParam("id")).toBe("123");
    expect(getQueryParam("name")).toBe("john");
    expect(getQueryParam("age")).toBe("25");
  });

  it("should return null for non-existent parameter", () => {
    window.history.replaceState({}, "", "/?id=123&name=john");
    const result = getQueryParam("missing");
    expect(result).toBe(null);
  });

  it("should handle empty parameter values", () => {
    window.history.replaceState({}, "", "/?id=&name=john");
    const result = getQueryParam("id");
    expect(result).toBe("");
  });

  it("should handle URL encoded values", () => {
    window.history.replaceState(
      {},
      "",
      "/?message=hello%20world&email=test%40example.com",
    );
    expect(getQueryParam("message")).toBe("hello world");
    expect(getQueryParam("email")).toBe("test@example.com");
  });
});
